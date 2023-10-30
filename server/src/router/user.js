const express = require('express');
const router = express.Router();
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

const userController = require('../app/controllers/user');
const adminController = require('../app/controllers/admin');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/current', verifyAccessToken, userController.getCurrent); //
//
router.put('/cart/delete', verifyAccessToken, userController.deleteCart);
router.get('/cart/getAll', verifyAccessToken, userController.getCart);
router.put('/cart', verifyAccessToken, userController.updateCart);
//
router.put('/current', verifyAccessToken, adminController.updateUser); //
router.put('/current/update-address', verifyAccessToken, userController.updateAddress); //

// admin

module.exports = router;
