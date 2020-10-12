import asyncHandler from 'express-async-handler';
import Order from '../model/orderModel.js';
import User from '../model/userModel.js';
import Product from '../model/productModel.js';

export default class OrderController {
  constructor() {}

  addOrderItems = asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  });

  getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  });

  updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (order && user && order.totalPrice < user.money) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      user.money -= order.totalPrice;

      const userIdAmountMap = new Map();

      order.orderItems.map(item => {
        console.log(item);
        userIdAmountMap.set(item.user, item.qty * item.price);
      });
      console.log(userIdAmountMap);

      for (const [userId, amount] of userIdAmountMap) {
        const user = await User.findById(userId);
        user.money += amount;
        await user.save();
      }

      const updatedOrder = await order.save();
      const updatedUser = await user.save();

      if (order.isPaid) {
        res.json({ order: updatedOrder, user: updatedUser });
      }
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  });

  updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    const productIdQtyMap = new Map();

    order.orderItems.map(item => {
      productIdQtyMap.set(item.product, item.qty);
    });

    for (const [product, qty] of productIdQtyMap) {
      const products = await Product.find({ _id: { $in: product } });
      const foundProduct = products[0];
      foundProduct.countInStock -= qty;
      await foundProduct.save();
    }

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  });

  getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    console.log(orders);
    res.json(orders);
  });

  getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  });
}
