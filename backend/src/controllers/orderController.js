import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrderFromCart = async (req, res, next) => {
  const {
    fullName,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
  } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      res.status(400);
      throw new Error("Cart is empty");
    }

    const items = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.price,
    }));

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress: {
        fullName,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
      },
      totalPrice,
      paymentStatus: "paid", // mock success
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id,
      totalPrice,
    });
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("items.product");

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
};


