import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

const ACCESS_TOKEN_COOKIE = "ttb_access";
const REFRESH_TOKEN_COOKIE = "ttb_refresh";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    return next(new Error(errors.array()[0].msg));
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User with this email already exists");
    }

    const user = await User.create({ name, email, password });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    setAuthCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    return next(new Error(errors.array()[0].msg));
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    setAuthCookies(res, accessToken, refreshToken);

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  const token =
    req.cookies?.ttb_refresh || req.body.refreshToken || req.headers["x-refresh-token"];

  if (!token) {
    res.status(401);
    return next(new Error("No refresh token provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const isStored = user.refreshTokens.some((t) => t.token === token);
    if (!isStored) {
      res.status(401);
      throw new Error("Refresh token not recognized");
    }

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshTokens = user.refreshTokens.filter((t) => t.token !== token);
    user.refreshTokens.push({ token: newRefreshToken });
    await user.save();

    setAuthCookies(res, newAccessToken, newRefreshToken);

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken: newAccessToken,
    });
  } catch (err) {
    res.status(401);
    next(new Error("Invalid refresh token"));
  }
};

export const logoutUser = async (req, res, next) => {
  const token =
    req.cookies?.ttb_refresh || req.body.refreshToken || req.headers["x-refresh-token"];

  try {
    if (token) {
      const decoded = jwt.decode(token);
      if (decoded?.userId) {
        const user = await User.findById(decoded.userId);
        if (user) {
          user.refreshTokens = user.refreshTokens.filter((t) => t.token !== token);
          await user.save();
        }
      }
    }

    res.clearCookie(ACCESS_TOKEN_COOKIE);
    res.clearCookie(REFRESH_TOKEN_COOKIE);
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
};


