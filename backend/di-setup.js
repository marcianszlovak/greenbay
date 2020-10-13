import awilix from 'awilix';

import OrderController from './controller/OrderController.js';
import UserController from './controller/UserController.js';
import ProductController from './controller/ProductController.js';
import OrderService from './service/OrderService.js';

export const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

export const setup = () => {
  container.register({
    orderController: awilix.asClass(OrderController),
    userController: awilix.asClass(UserController),
    productController: awilix.asClass(ProductController),
    orderService: awilix.asClass(OrderService),
  });
};
