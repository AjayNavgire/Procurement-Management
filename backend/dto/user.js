const Joi = require("joi")

const userRegisterDTO = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    countryCode: Joi.string().required(),
    mobile: Joi.string().length(10).required(),
    role: Joi.string().required(),
    _procurement: Joi.string().optional(),
    _inspection: Joi.string().optional(),
    _client: Joi.string().optional(),
});

const userUpdateDTO = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    countryCode: Joi.string().optional(),
    mobile: Joi.string().length(10),
    role: Joi.string().optional(),
    _procurement: Joi.string().optional(),
    _inspection: Joi.string().optional(),
    _client: Joi.string().optional(),
});

const emailLoginDTO = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

const mobileLoginDTO = Joi.object({
    countryCode: Joi.string().required(),
    mobile: Joi.string().required(),
    password: Joi.string().required()
});

module.exports = {
    userRegisterDTO,
    userUpdateDTO,
    emailLoginDTO,
    mobileLoginDTO
};
