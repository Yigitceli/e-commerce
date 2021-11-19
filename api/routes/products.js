const { GET_PRODUCTS, GET_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } = require("../controllers/productController");
const Product = require("../db/Models/Product");
const authenticate = require("../middlewares/auth");
const router = require("express").Router();

router.get("/", GET_PRODUCTS);
router.get('/:id', GET_PRODUCT);

router.post('/', authenticate, ADD_PRODUCT);
router.put('/:id', authenticate, UPDATE_PRODUCT);
router.delete('/:id', authenticate, DELETE_PRODUCT);

module.exports = router;
