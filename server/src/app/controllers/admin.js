const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const {
    generateAccessToken,
    generateRefreshToken
} = require('../../middlewares/jwt');

//

const login = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password) {
        return res.status(200).json({
            success: false,
            message: 'You have entered the wrong email or password...'
        });
    }
    const response = await User.findOne({
        email
    }); // Instance được trả về khi dùng hàm của mongodb
    if (response.role !== '2003') throw new Error('Not Authorised');
    if (response && (await response.isCorrectPassWord(password))) {
        const {
            password,
            refreshToken,
            ...userData
        } = response.toObject();
        const userId = response._id;
        const accessToken = generateAccessToken(userId, userData.role); // taoj access
        const newRefreshToken = generateRefreshToken(userId); // tao refresh
        //lưu refresh token vào db
        await User.findByIdAndUpdate(userId, {
            refreshToken: newRefreshToken
        }, {
            new: true
        }); // trả về data new sau khi update data
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            maxAge: 604800000 // thời gian hết hạn 7 ngày
        });
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        });
    } else {
        throw new Error('invalid credentials !');
    }
});

const getUser = asyncHandler(async (req, res) => {
    const queries = {
        ...req.query
    };
    const excludeFields = ['limit', 'page', 'sort', 'fields'];
    excludeFields.forEach((item) => delete queries[item]); // loai bo cac truong

    //format
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (item) => `$${item}`); //chuyển thành $gte $gt
    const formatQueries = JSON.parse(queryString);
    if (queries?.name) formatQueries.name = {
        $regex: queries.name,
        $options: 'i'
    };
    if (queries?.name) {
        delete formatQueries.name;
        formatQueries['$or'] = [{
                name: {
                    $regex: req.query?.name,
                    $options: 'i'
                }
            },
            {
                email: {
                    $regex: req.query?.name,
                    $options: 'i'
                }
            }
        ];
    }

    let queriesCommand = User.find(formatQueries);

    if (req?.query?.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queriesCommand = queriesCommand.sort(sortBy);
    }

    if (req?.query?.fields) {
        const fields = req?.query?.fields.split(',').join(' ');
        queriesCommand = queriesCommand.select(fields);
    }

    const page = +req?.query?.page + 1|| 1;
    const limit = +req?.query?.limit || process.env.LIMIT_PRODUCTS;
    const skip = (page - 1) * limit;
    queriesCommand = queriesCommand.select('-refreshToken -password');
    queriesCommand.skip(skip).limit(limit);
    //
    try {
        const response = await queriesCommand.exec();
        const count = await User.find().countDocuments();
        return res.status(200).json({
            success: response ? true : false,
            users: response ? response.filter((user) => +user.role !== 2003) : 'cannot products...',
            totalCount: count
        });
    } catch (err) {
        throw new Error(err.message);
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const {
        _id
    } = req.query;
    if (!_id) throw new Error('missing input.');
    const response = await User.findByIdAndDelete(_id);
    return res.status(200).json({
        success: response ? true : false,
        deletedUser: response ? `User with email ${response.email} deleted` : 'No user delete'
    });
});

const updateUser = asyncHandler(async (req, res) => {
    const {
        id
    } = req.user;
    if (!id || Object.keys(req.body).length === 0) throw new Error('missing input.');
    const response = await User.findByIdAndUpdate(id, req.body, {
        new: true
    }).select('-refreshToken -role -password');
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
    });
});

const updateByUserAdmin = asyncHandler(async (req, res) => {
    const {
        aid
    } = req.params;
    if (!aid || Object.keys(req.body).length === 0) throw new Error('missing input.');
    const response = await User.findByIdAndUpdate(aid, req.body, {
        new: true
    }).select('-role -password -refreshToken');
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
    });
});


const updateUserIsBlocked = async (req, res) => {
    const {
        idUser
    } = req.params;
    const {
        isBlocked
    } = req.body;
    try {
        const user = await User.findById(idUser);
        if (!user) {
            throw new Error("Loi")
        }
        user.isBlocked = isBlocked;
        await user.save();
        return res.status(200).json({
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: true
        });
    }
};

const updateOrderStatus = async (req, res) => {
    const {
        orderId
    } = req.params;
    const {
        newStatus
    } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error("Loi");
        }
        order.status = newStatus;
        await order.save();
        return res.status(200).json({
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: true
        });
    }
};

const createProductbyAdmin = asyncHandler(async (req, res) => {
    const {
        title,
        price,
        description,
        brand,
        category,
        quantity,
        images
    } = req.body;
    if (!(title && price && description && brand && category && quantity)) throw new Error('Missing input...');
    req.body.slug = slugify(title);
    req.body.thumb = images[0]
    const newProduct = await Product.create(req.body);
    return res.status(200).json({
        success: newProduct ? true : false,
        createProduct: newProduct ? newProduct : 'Cannot create product'
    });
})

const deleteProducts = asyncHandler(async (req,res)=>{
    try {
        const productIds = req.body; 
        const result = await Product.deleteMany({ _id: { $in: productIds } });
        if (result.deletedCount > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false});
        }
    } catch (error) {
        res.status(500).json({ success: false});
    }
})

const deleteUsers = asyncHandler(async (req,res)=>{
    try {
        const userIds = req.body; 
        const result = await User.deleteMany({ _id: { $in: userIds } });
        if (result.deletedCount > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false});
        }
    } catch (error) {
        res.status(500).json({ success: false});
    }
})

//
module.exports = {
    getUser,
    deleteUser,
    updateUser,
    updateByUserAdmin,
    createProductbyAdmin,
    login,
    updateUserIsBlocked,
    updateOrderStatus,
    deleteProducts,
    deleteUsers
};