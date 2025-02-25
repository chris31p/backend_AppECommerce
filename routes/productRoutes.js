const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');

productRouter.get("/getallproducts", productController.getProducts);
productRouter.get("/getproduct/:id", productController.getProductById);
productRouter.post("/createproduct", auth, productController.createProduct); // Solo usuarios autenticados pueden crear productos
productRouter.put("/updateproduct/:id", auth, productController.updateProductById); // Solo usuarios autenticados pueden actualizar productos
productRouter.delete("/deleteproduct/:id", auth, productController.deleteProductById); // Solo usuarios autenticados pueden eliminar productos

module.exports = productRouter;

