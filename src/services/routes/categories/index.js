const express = require("express");
const router = require("express").Router();
const {
  createCategory,
  getOneCategory,
  getCategories,
  editCategory,
  deleteCategory,
} = require("../../../../src/controllers/categories");

router.get("/", getCategories);
router.get("/:categoryId", getOneCategory);
router.post("/", createCategory);
router.put("/:categoryId", editCategory);
router.delete("/:categoryId", deleteCategory);

module.exports = router;
