const router = require("express").Router();
const {
  createProduct,
  getOneProduct,
  getProductReviews,
  getProducts,
  editProduct,
  deleteProduct,
} = require("../../../../src/controllers/products");
const multer = require("multer");
const cloudinary = require("../../cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Strive Products",
  },
});

const cloudinaryMulter = multer({ storage: storage });

router.get("/", getProducts);
router.get("/:productId/reviews", getProductReviews);
router.get("/:productId", getOneProduct);
router.post("/", cloudinaryMulter.single("image"), createProduct);
router.put("/:productId", editProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;
