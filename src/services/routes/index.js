const router = require("express").Router();

const cartRouter = require("./carts");
const categoryRouter = require("./categories");
const productRouter = require("./products");
const reviewRouter = require("./reviews");
const userRouter = require("./users");


router.use("/carts", cartRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/reviews", reviewRouter);
router.use("/users", userRouter);


module.exports = router;
