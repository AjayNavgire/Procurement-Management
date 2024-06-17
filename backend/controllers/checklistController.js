const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Checklist = require("../models/checklistModel");
const {createDTO, updateDTO} = require("../dto/checklist");
const requestValidator = require("../utils/request-validator");
const cloudinary = require("cloudinary");
const fs = require("fs");

// Create new checklist
exports.newChecklist = catchAsyncErrors(async (req, res, next) => {

    const errors = requestValidator(createDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
	};

    req.body._createdBy = req.user._id;

    const order = await Checklist.create({ ...req.body });

    res.status(201).json({
        success: true,
        order,
    });
});

// get Single Checklist
exports.getSingleChecklist = catchAsyncErrors(async (req, res, next) => {

    const checklist = await Checklist.findById(req.params.id)
  
    if (!checklist) {
      return next(new ErrorHandler("Checklist not found with this Id", 404));
    }
  
    res.status(200).json({
      success: true,
      checklist,
    });
  });

// Update Checklist
exports.updateChecklist = catchAsyncErrors(async (req, res, next) => {
    
    const errors = requestValidator(updateDTO, req.body);

    if (errors) {
        return next(new ErrorHandler(errors, 403));
	};

    if (req && req.files && (req.files.beforeLoading || req.files.afterLoading)) {

        let avatar;
        const checklist = await Checklist.findById(req.params.id);

        // check before update image 
        if (beforeLoading && checklist && checklist.imageBeforeLoading)
            await cloudinary.v2.uploader.destroy(checklist.imageBeforeLoading.publice_id);

        if (afterLoading && checklist && checklist.imageAfterLoading)
            await cloudinary.v2.uploader.destroy(checklist.imageAfterLoading.publice_id);

        if (beforeLoading) avatar = beforeLoading.tempFilePath;
        if (afterLoading) avatar = afterLoading.tempFilePath;

        const mycloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "parcel"
        })

        fs.rmSync("./tmp", { recursive: true });

        if (beforeLoading)
            req.body.imageBeforeLoading = {
                publice_id: mycloud.public_id,
                url: mycloud.secure_url
            };

        if (afterLoading)
            req.body.imageAfterLoading = {
                publice_id: mycloud.public_id,
                url: mycloud.secure_url
            };

    };

    const checklist = await Checklist.findByIdAndUpdate(req.params.id, { ...req.body }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        checklist
    })
})