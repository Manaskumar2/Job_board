const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({


        name: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            maxlength: 15,
        },

},{ timestamps: true })


module.exports = mongoose.model("employee", userSchema);