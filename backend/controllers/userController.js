const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const { userRegisterDTO, userUpdateDTO, emailLoginDTO, mobileLoginDTO } = require("../dto/user");
const requestValidator = require("../utils/request-validator");
const mongoose = require('mongoose');

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const errors = requestValidator(userRegisterDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
    };

    req.body._createdBy = req.user.id;
    const role = req.user.role;

    const checkRole = await User.find({ role: req.body.role, _createdBy: req.user.id });

    //Check for avoid duplication of inspection manager under procurement manager.   
    if (role === "procurement manager" &&
        req.body.role === "inspection manager" &&
        checkRole[0] &&
        checkRole[0].role === "inspection manager") {

        return next(new ErrorHandler("Role already present in your id", 403))
    };

    //Procurement manager cannot create role admin
    if (role === "procurement manager" && req.body.role === "admin") {
        return next(new ErrorHandler("You cannot create this role", 403))
    }

    const user = await User.create({ ...req.body });

    res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        user
    })

})

// Login User With Email
exports.loginWithEmail = catchAsyncErrors(async (req, res, next) => {
    const errors = requestValidator(emailLoginDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
    };

    const { email, password } = req.body;

    // Checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    if (user && user.role == "inspection manager") {
        return next(new ErrorHandler("Please login with mobile number and password", 401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    sendToken(user, 200, res)
})

// Login User With Mobile No
exports.loginWithMobile = catchAsyncErrors(async (req, res, next) => {

    const errors = requestValidator(mobileLoginDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
    };

    const { mobile, password } = req.body;

    // Checking if user has given password and mobile both

    if (!mobile || !password) {
        return next(new ErrorHandler("Please Enter mobile no. & Password", 400));
    }

    const user = await User.findOne({ mobile }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid mobile no. or password", 401))
    }

    if (user && user.role !== "inspection manager") {
        return next(new ErrorHandler("Please login with email id and password", 401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid mobile no. or password", 401))
    }

    sendToken(user, 200, res)
})

// Get single user
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
});

// Get all user
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {

    const userRole = req.user.role;
    const _id = req.user.id;
    let { role } = req.query;
    let query = {}

    if (userRole === "procurement manager") {
        query._procurement = new mongoose.Types.ObjectId(`${_id}`);
    };
    if (userRole === "inspection manager") {
        query._inspection = new mongoose.Types.ObjectId(`${_id}`);
    };
    if (role) {
        query.role = role
    }

    const user = await User.find(query);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Update User
exports.updateUser = catchAsyncErrors(async (req, res, next) => {

    const errors = requestValidator(userUpdateDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
    };

    const user = await User.findByIdAndUpdate(req.params.id, { ...req.body }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user
    })
})
