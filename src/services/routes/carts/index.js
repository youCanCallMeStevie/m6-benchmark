const express = require("express");
const router = require("express").Router();
const {
  createCart,
  getOneCart,
  editCart,
  deleteCart,
} = require("../../../../src/controllers/carts");

router.get("/:cartId", getOneCart);
router.post("/", createCart);
router.put("/:cartId", editCart);
router.delete("/:cartId", deleteCart);

module.exports = router;
