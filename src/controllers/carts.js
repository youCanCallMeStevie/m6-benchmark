const ApiError = require("../classes/apiError");
const Model = require("../helpers/model");
const Carts = new Model("carts");

exports.createCart = async (req, res, next) => {
  try {
    const response = await Carts.save(req.body);
    res.status(201).json({ data: "Cart created" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getCarts = async (req, res, next) => {
  try {
    const response = await Carts.findOne();
    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getOneCart = async (req, res, next) => {
  const { cartId } = req.params;
  try {
    const response = await Carts.findById(cartId);
    if (response.rowCount === 0) {
      throw new ApiError(404, `No Cart with ID ${cartId} found`);
    } else {
      res.status(200).json({ data: response.rows[0] });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.editCart = async (req, res, next) => {
  const { cartId } = req.params;
  try {
    const response = await Carts.findByIdAndUpdate(cartId, req.body);
    if (response.rowCount === 0) {
      throw new ApiError(404, `No Cart with ID ${cartId} found`);
    } else {
      res.status(201).json({ data: Updated });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteCart = async (req, res, next) => {
  const { cartId } = req.params;
  try {
    const response = await Carts.findByIdAndDelete(cartId);
    if (response.rowCount === 0) {
      throw new ApiError(404, `No Cart with ID ${cartId} found`);
    } else {
      res.status(201).json({ data: deleted });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
