const express = require('express');
const router = express.Router();
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

const adminController = require('../app/controllers/admin');
const orderController = require('../app/controllers/order');
const productController = require('../app/controllers/product');
//
router.post('/login', adminController.login);
router.get('/get-all-user', [verifyAccessToken, isAdmin], adminController.getUser);
router.get('/get-all-order', [verifyAccessToken, isAdmin], orderController.getOrderByAdmin); //
router.get('/get-all-products', [verifyAccessToken, isAdmin], productController.getProducts); //

router.post('/update-order/:orderId',[verifyAccessToken, isAdmin],adminController.updateOrderStatus)
router.post('/update-user/:idUser',[verifyAccessToken, isAdmin],adminController.updateUserIsBlocked)
router.post('/create-product',[verifyAccessToken, isAdmin],adminController.createProductbyAdmin)
router.delete('/delete-products',[verifyAccessToken, isAdmin],adminController.deleteProducts)
router.delete('/delete-user',[verifyAccessToken, isAdmin],adminController.deleteUsers)
router.post('/update-products/:pid',[verifyAccessToken, isAdmin],productController.updateProduct)

//
module.exports = router;
