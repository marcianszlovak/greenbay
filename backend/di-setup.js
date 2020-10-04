import * as awilix from 'awilix';

import OrderController from './controllers/OrderController.js';
import UserController from './controllers/UserController.js';
import ProductController from './controllers/ProductController.js';

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
