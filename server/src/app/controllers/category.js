const Category = require('../models/Category');
const asyncHandler = require('express-async-handler');

//

const createCategory = asyncHandler(async (req, res) => {
    const { title } = req.body;
    if (!title) throw new Error('Missing input...');
    const response = await Category.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        category: response ? response : 'not create category...'
    });
});

const getCategory = asyncHandler(async (req, res) => {
    const response = await Category.find().select('title brand');
    return res.json({
        success: response ? true : false,
        data: response ? response : 'no category ...'
    });
});

const updateCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const response = await Category.findByIdAndUpdate(pcid, req.body, { new: true });
    return res.json({
        success: response ? true : false,
        categoryUpdate: response ? response : 'No update category..'
    });
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const response = await Category.findByIdAndDelete(pcid);
    return res.json({
        success: response ? true : false
    });
});

///

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
};
