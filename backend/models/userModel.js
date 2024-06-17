const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false
    },

    mobile: {
        type: String,
        required: [true, "Please Enter Your Mobile Number"],
        unique: true
    },
    countryCode: {
        type: String,
        required: [true, "Please Enter Your Country Code"],
    },

    role: {
        type: String,
        default: "user"
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
    _createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    _procurement: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    _inspection: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    _client: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
});

userSchema.indexes({ 'email': 1, 'mobileno': 1 }, { unique: true });

userSchema.pre("save", async function (next) {

    // Hash Password    
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

// Compare Password
userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};

module.exports = mongoose.model("user", userSchema)