const mongoose = require('mongoose')


const employerSchema = new mongoose.Schema({

        title: { 
            type: String,
            trim: true,
            required: true,
            enum: ['Mr', 'Mrs', 'Miss']
        },

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

module.exports = mongoose.model("Employer", employerSchema);