const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Order = require("../models/orderModel");
const {createDTO, updateDTO} = require("../dto/order");

const requestValidator = require("../utils/request-validator")

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {

  const errors = requestValidator(createDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
	};

  req.body._createdBy = req.user._id;

  if(req.user.role = "client") req.body._client = req.user._id

  const order = await Order.create({ ...req.body });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {

  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user Orders
exports.orders = catchAsyncErrors(async (req, res, next) => {

  const role = req.user.role;
  let query = {};

  if (role === "inpsection manager") query = { _inspection: req.user._id };
  if (role === "client") query = { _client: req.user._id };
  if (role === "procurement manager") query = { _procurement: req.user._id };

  const orders = await Order.find(query);
  const ord = await Order.find(query).populate("_client");
  console.log(ord)

  res.status(200).json({
    success: true,
    orders,
  });
});

// update Order 
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {

  const errors = requestValidator(updateDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
	};

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.status === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  order.status = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});