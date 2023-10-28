const mongoose = require('mongoose'); // Erase if already required

var orderSchema = new mongoose.Schema(
    {
        products: [
            {
                product_id: { type: mongoose.Types.ObjectId, ref: 'Product' },
                count: Number,
                price: Number
            }
        ],
        status: {
            type: String,
            default: 'Processing',
            enum: ['Cancelled', 'Processing', 'Success']
        },
        total: Number,
        coupon: {
            type: mongoose.Types.ObjectId,
            ref: 'Coupon'
        },
        orderBy: { type: mongoose.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Order', orderSchema);
