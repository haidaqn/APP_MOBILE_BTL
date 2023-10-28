// import middleware
const { notFoundPath, errHandler } = require('../middlewares/errHandler');
//
const newUser = require('./user');
const newProduct = require('./product');
const newBlog = require('./blog');
const newCategory = require('./category');
const newCoupon = require('./coupon');
const newOrder = require('./order');
const newAdmin = require('./admin');
//
const initRoutes = (app) => {
    app.use('/api/user', newUser);
    app.use('/api/product', newProduct);
    app.use('/api/category', newCategory);
    app.use('/api/blog', newBlog);
    app.use('/api/coupon', newCoupon);
    app.use('/api/order', newOrder);
    app.use('/api/admin', newAdmin);

    //err path
    app.use(notFoundPath);
    app.use(errHandler); // hứng lỗi
};

module.exports = initRoutes;
