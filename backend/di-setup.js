import * as awilix from 'awilix';

import OrderController from './controller/OrderController.js';
import UserController from './controller/UserController.js';
import ProductController from './controller/ProductController.js';

export const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

export const setup = () => {
  container.register({
    orderController: awilix.asClass(OrderController),
    userController: awilix.asClass(UserController),
    productController: awilix.asClass(ProductController),
  });
};
