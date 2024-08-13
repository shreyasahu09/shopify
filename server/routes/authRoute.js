import express from 'express';
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from '../controllers/authcontroller.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

// Registration route || POST
router.post('/register', registerController);

// Login route || POST
router.post('/login', loginController);

// Forgot password || POST
router.post('/forgot-password', forgotPasswordController);

// Test routes || GET
router.get('/test', requireSignIn, isAdmin, testController);

// Protected user route || GET
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected admin route || GET
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Update profile || PUT
router.put('/profile', requireSignIn, updateProfileController);

// User orders || GET
router.get('/orders', requireSignIn, getOrdersController);

// All orders || GET (Admin only)
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController);

// Update order status || PUT (Admin only)
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController);

export default router;
