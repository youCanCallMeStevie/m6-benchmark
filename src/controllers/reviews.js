const ApiError = require("../classes/apiError");
const Model = require("../helpers/model");
const Reviews = new Model("reviews");
const { query } = require("../helpers/db");


exports.createReview = async (req, res, next) => {
  try {
    const response = await Reviews.save(req.body);
    res.status(201).json({ data: "Review created" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const response = await Reviews.findOne();
    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getOneReview = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const response = await Reviews.findById(reviewId);
    if (response.rowCount === 0) {
      throw new ApiError(404, `No review with ${reviewId} found`);
    } else {
      res.status(201).json({ data: response.rows[0] });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.editReview = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const response = await Reviews.findByIdAndUpdate(reviewId, req.body);
    if (response.rowCount === 0) {
      throw new ApiError(404, `No review with ${reviewId} found`);
    } else {
      res.status(201).json({ data: `Review with ID ${reviewId} updated` });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const response = await Reviews.findByIdAndDelete(reviewId);
    if (response.rowCount === 0) {
      throw new ApiError(404, `No review with ${reviewId} found`);
    } else {
      res.status(200).json({ data: `Review with ID ${reviewId} deleted` });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
