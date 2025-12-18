import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await cart.populate("items.product");
  }
  return cart;
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

export const addToCart = async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const cart = await getOrCreateCart(req.user._id);

    const existingItem = cart.items.find(
      (item) => item.product._id.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: product._id,
        quantity,
        price: product.price,
      });
    }

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const updateCartItem = async (req, res, next) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await getOrCreateCart(req.user._id);
    const item = cart.items.find(
      (i) => i.product._id.toString() === productId
    );

    if (!item) {
      res.status(404);
      throw new Error("Item not found in cart");
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.product._id.toString() !== productId
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (err) {
    next(err);
  }
};

export const removeCartItem = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = cart.items.filter(
      (i) => i.product._id.toString() !== productId
    );
    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

export const clearCart = async (userId) => {
  await Cart.findOneAndUpdate({ user: userId }, { items: [] });
};


