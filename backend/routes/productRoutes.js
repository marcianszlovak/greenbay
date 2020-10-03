import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js';
import { container, setup } from '../di-setup.js';

setup();
const router = express.Router();

const productController = container.resolve('productController');

router
    .route('/')
    .get(productController.getProducts)
    .post(protect, admin, productController.createProduct);
router
    .route('/:id/reviews')
    .post(protect, productController.createProductReview);
router.get('/top', productController.getTopProducts);
router
    .route('/:id')
    .get(productController.getProductById)
    .delete(protect, admin, productController.deleteProduct)
    .put(protect, admin, productController.updateProduct);

export default router;
