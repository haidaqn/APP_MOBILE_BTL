const mongoose = require('mongoose'); // Erase if already required

var blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        numberViews: { type: Number, default: 0 },
        likes: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        ],
        disLiked: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        ],
        image: {
            type: String,
            default:
                'https://assets-global.website-files.com/5b68224723db9d4df3f98c08/624976adfd71eb557431469a_Services%20Background.png'
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

module.exports = mongoose.model('Blog', blogSchema);
