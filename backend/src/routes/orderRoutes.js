import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createOrderFromCart,
  getOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

router.use(protect);

router.post("/checkout", createOrderFromCart);
router.get("/:id", getOrderById);

export default router;


