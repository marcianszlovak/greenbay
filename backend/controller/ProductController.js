import asyncHandler from 'express-async-handler';

export default class ProductController {
  constructor({ productService }) {
    this.productService = productService;
  }

  getProducts = asyncHandler(async (req, res) => {
    const products = await this.productService.getAll(
      Number(req.query.pageNumber) || 1,
      req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          }
        : {}
    );

    res.json(products);
  });

  getTopProducts = asyncHandler(async (req, res) => {
    const topProducts = await this.productService.getTop();

    res.json(topProducts);
  });

  getMyProducts = asyncHandler(async (req, res) => {
    const myProducts = await this.productService.getAllMy(
      Number(req.query.pageNumber) || 1,
      req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          }
        : {},
      req.user._id
    );

    res.json(myProducts);
  });

  getProductById = asyncHandler(async (req, res) => {
    const product = await this.productService.getById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });

  deleteProduct = asyncHandler(async (req, res) => {
    const deletedProduct = await this.productService.delete(req.params.id);

    if (!deletedProduct) {
      res.status(404);
      throw new Error(`Failed to remove product with ID ${req.params.id}.`);
    }

    res.json({ message: `Product with id ${req.params.id} removed` });
  });

  createProduct = asyncHandler(async (req, res) => {
    const createdProduct = await this.productService.add(
      req.user._id,
      req.user.name
    );

    res.status(201).json(createdProduct);
  });

  updateProduct = asyncHandler(async (req, res) => {
    const updatedProduct = await this.productService.update(
      req.params.id,
      req.body.name,
      req.body.price,
      req.body.description,
      req.body.image,
      req.body.brand,
      req.body.category,
      req.body.countInStock,
      req.body.userProfilePicture
    );

    if (!updatedProduct) {
      res.status(404);
      throw new Error(`Failed to update product with ${req.params.id}`);
    }

    res.json(updatedProduct);
  });

  addProductReview = asyncHandler(async (req, res) => {
    const reviewedProduct = await this.productService.addReview(
      req.body.rating,
      req.body.comment,
      req.params.id,
      req.user._id,
      req.user.name
    );

    if (reviewedProduct) {
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });
}
