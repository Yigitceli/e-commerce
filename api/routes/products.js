const { GET_PRODUCTS, GET_PRODUCT } = require("../controllers/productController");
const Product = require("../db/Models/Product");

const router = require("express").Router();

router.get("/", GET_PRODUCTS);
router.get('/:id', GET_PRODUCT);

module.exports = router;
