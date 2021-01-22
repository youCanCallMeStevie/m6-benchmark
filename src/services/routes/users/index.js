const express = require("express");
const router = require("express").Router();
const {
  createUser,
  getOneUser,
  getUsers,
  editUser,
  deleteUser,
} = require("../../../../src/controllers/users");

router.get("/", getUsers);
router.get("/:userId", getOneUser);
router.post("/", createUser);
router.put("/:userId", editUser);
router.delete("/:userId", deleteUser);

module.exports = router;