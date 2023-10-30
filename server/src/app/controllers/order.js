const Order = require('../models/Order');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const exclude = 'title price';

const createOrder = asyncHandler(async (req, res) => {
    // console.log(req.user);
    const id = req.user.id;
    const coupon = req.body.coupon;
    const userOrder = req.body.products;

    const products = userOrder.map((item, index) => ({
        product_id: item.id,
        count: item.quantity,
        price: item.price
    }));

    let total = userOrder.reduce((sum, item) => item.price * item.quantity + sum, 0);
    if (coupon) total = Math.round((total * (1 - +coupon / 100)) / 100) * 100; // 3 số cuối là 0
    const response = await Order.create({
        products: products,
        total: total,
        orderBy: id
    });
    return res.status(200).json({
        success: response ? true : false,
        data: response
    });
});

const updateStatus = asyncHandler(async (req, res) => {
    const oid = req.params.oid;
    const status = req.body.status;
    if (!status) throw new Error('Missing input....');
    const response = await Order.findByIdAndUpdate(oid, { status }, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : 'No update status...'
    });
});
const productExclude = 'title images price';
const getOrderByUser = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const response = await Order.find({ orderBy: id }).populate('products.product_id', productExclude);
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : 'No get order by user...'
    });
});

const getOrderByAdmin = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    const excludeFields = ['limit', 'page', 'sort', 'fields'];
    excludeFields.forEach((item) => delete queries[item]); // loai bo cac truong
    //format
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (item) => `$${item}`); //chuyển thành $gte $gt
    const formatQueries = JSON.parse(queryString);
    let queriesCommand = Order.find(formatQueries);
    if (req?.query?.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queriesCommand = queriesCommand.sort(sortBy);
    }
    if (req?.query?.fields) {
        const fields = req?.query?.fields.split(',').join(' ');
        queriesCommand = queriesCommand.select(fields);
    }
    const page = +req?.query?.page +1 || 1;
    const limit = +req?.query?.limit || process.env.LIMIT_PRODUCTS;
    const skip = (page - 1) * limit;
    queriesCommand = queriesCommand.select('-refreshToken -password');
    queriesCommand.skip(skip).limit(limit);
    //
    try {
        const response = await queriesCommand.exec();
        const count = await Order.find().countDocuments();
        return res.status(200).json({
            success: response ? true : false,
            users: response ? response.filter((user) => +user.role !== 2003) : 'cannot products...',
            totalCount: count
        });
    } catch (err) {
        throw new Error(err.message);
    }
});

//
module.exports = {
    createOrder,
    updateStatus,
    getOrderByUser,
    getOrderByAdmin
};
