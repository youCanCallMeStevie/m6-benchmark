const ApiError = require("../classes/apiError");
const Model = require("../helpers/model");
const Products = new Model("products");
const Reviews = new Model("reviews");
const { query } = require("../helpers/db");

exports.createProduct = async (req, res, next) => {
  try {
    console.log(req.file.path);
    req.body.imageUrl =req.file.path
     const response = await Products.save(req.body);
   
    res.status(201).json({ data: "Your Product has been created" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    if (Object.entries(req.query).length === 0) {
      const response = await Products.findOne();
      res.status(200).json({ data: response });
    } else {
      const response = await Products.findOne(req.query);
      if (response.rowCount === 0) {
        throw new ApiError(
          404,
          `No products with ${Object.keys(req.query)} like ${Object.values(
            req.query
          )} found`
        );
      } else {
        res.status(200).json({ data: response });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getOneProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const response = await Products.findById(productId);
    if (response.rowCount === 0) {
      throw new ApiError(404, `No product with ${productId} found`);
    } else {
      res.status(200).json({ data: response.rows[0] });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getProductReviews = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const response = await Products.findById(productId);
    if (response.rowCount === 0) {
      throw new ApiError(404, `No product with ${productId} found`);
    } else {
      const reviews = await query(
        `SELECT * FROM reviews AS r, products AS p WHERE r.product_id = p.id AND p.id=${productId}`
      );
      if (reviews.rowCount === 0) {
        throw new ApiError(404, `There are no reviews for this product`);
      } else {
        res.status(200).json({ data: reviews});
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.editProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const response = await Products.findByIdAndUpdate(productId, req.body);
    if (response.rowCount === 0) {
      throw new ApiError(404, `No Product with ${productId} found`);
    } else {
      res.status(200).json({ data: `Product with ID ${categoryId} has been updated` });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const response = await Products.findByIdAndDelete(productId);
    if (response.rowCount === 0) {
      throw new ApiError(404, `No Product with ${productId} found`);
    } else {
      res.status(200).json({ data: `Product with ID ${categoryId} has been deleted` });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
