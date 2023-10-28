const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

var userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        avatar: {
            type: String
        },
        mobile: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: [1111, 2003],
            default: 1111 // 1111 là user
            // 2003 là admin
        },
        address: String,
        isBlocked: {
            type: Boolean,
            default: false
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

// hash password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync(10);
        this.password = await bcrypt.hash(this.password, salt);
    } else {
        next();
    }
});

// check pw
userSchema.methods = {
    isCorrectPassWord: async function (pw) {
        return await bcrypt.compare(pw, this.password);
    },
    createPasswordChangedToken: function () {
        const resetToken = crypto.randomBytes(32).toString('hex');
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.passwordResetExpires = Date.now() + 5 * 60 * 1000;
        return resetToken;
    }
};

module.exports = mongoose.model('User', userSchema);
