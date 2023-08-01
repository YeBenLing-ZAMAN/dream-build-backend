const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductDetails,
  getPcComponents,
  addPcComponent,
} = require("../../controllers/scureController/index");

router.get("/products", getAllProducts);
router.get("/products/:id", getProductDetails);
router.get("/pcBuilder", getPcComponents);
router.post("/pcBuilder", addPcComponent);

module.exports = router;
