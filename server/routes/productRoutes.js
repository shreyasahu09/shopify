import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
  productCategoryController,
  braintreeTokenController,
  brainTreePaymentController
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js"
import formidable from "express-formidable";
import braintree from "braintree";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);
//filter
router.post("/product-filters",productFiltersController);
//delete product
router.delete("/product/:pid", deleteProductController);

//search products
router.get('/search/:keyword',searchProductController)
//searching on the basis of keyword

//similar product
router.get('/related-product/:pid/:cid',relatedProductController);

//filter
router.post("/product-filters",productFiltersController);

//product count
router.get('/product-count',productCountController);

//product per page
router.get('/product-list/:page',productListController);

//category wise product
router.get('/product-category/:slug',productCategoryController)
//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);
//filter
router.post("/product-filters",productFiltersController);

//payment routes

router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;