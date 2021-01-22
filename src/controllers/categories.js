const ApiError = require("../classes/apiError");
const Model = require("../helpers/model");
const Categories = new Model("Categories");
const { query } = require("../helpers/db");

exports.createCategory = async (req, res, next) => {
  try {
    const response = await Categories.save(req.body);
    res.status(201).json({ data: "Your category has been created" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    if (Object.entries(req.query).length === 0) {
      const response = await Categories.findOne();
      res.status(200).json({ data: response });
    } else {
      const response = await Categories.findOne(req.query);
      if (response.rowCount === 0) {
            throw new ApiError(
              404,
              `No categories with ${Object.keys(req.query)} like ${Object.values(
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



exports.getOneCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const response = await Categories.findById(categoryId);
    if (response.rowCount === 0) {
      throw new ApiError(404, `No category with ID ${categoryId} found`);
    } else {
      res.status(200).json({ data: response.rows[0] });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.editCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const response = await Categories.findByIdAndUpdate(categoryId, req.body);
    if (response.rowCount === 0) {
      throw new ApiError(404, `No category with ${categoryId} found`);
    } else {
      res.status(200).json({ data: `Category with ID ${categoryId} has been updated` });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const response = await Categories.findByIdAndDelete(categoryId);
    if (response.rowCount === 0) {
      throw new ApiError(404, `No category with ${categoryId} found`);
    } else {
      res.status(200).json({ data: `Category with ID ${categoryId} has been deleted` });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
