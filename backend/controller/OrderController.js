import asyncHandler from 'express-async-handler';

export default class OrderController {
  constructor({ orderService }) {
    this.orderService = orderService;
  }

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

    const user = req.user._id;

    const createdOrder = await this.orderService.add(
      orderItems,
      user,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    );

    res.status(201).json(createdOrder);
  });

  getOrderById = asyncHandler(async (req, res) => {
    const order = await this.orderService.getById(req.params.id);

    res.json(order);
  });

  updateOrderToPaid = asyncHandler(async (req, res) => {
    const paidOrder = await this.orderService.updateToPaid(
      req.params.id,
      req.user.id,
      req.body.id,
      req.body.status,
      req.body.update_time,
      req.body.email_address
    );

    res.json(paidOrder);
  });

  updateOrderToDelivered = asyncHandler(async (req, res) => {
    const updatedOrder = await this.orderService.updateToDelivered(
      req.params.id
    );

    if (updatedOrder) {
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  });

  getMyOrders = asyncHandler(async (req, res) => {
    const myOrders = await this.orderService.getMy(req.user._id);
    res.json(myOrders);
  });

  getAllOrders = asyncHandler(async (req, res) => {
    const allOrders = await this.orderService.getAll();
    res.json(allOrders);
  });
}
