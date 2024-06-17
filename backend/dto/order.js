const Joi = require("joi");

const createDTO = Joi.object({
    orderId: Joi.string().required(),
    from: Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        postalCode: Joi.string().required()
    }).required(),
    to: Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        postalCode: Joi.string().required()
    }).required(),
    status: Joi.string().valid('In Transit', 'Delivered', 'Cancelled').required(),
    estimatedDelivery: Joi.string().isoDate().required(),
    _procurement: Joi.string().optional(),
    _inspection: Joi.string().optional(),
    _client: Joi.string().required()
});

const updateDTO = Joi.object({
    orderId: Joi.string(),
    from: Joi.object({
        name: Joi.string(),
        address: Joi.string(),
        city: Joi.string(),
        country: Joi.string(),
        postalCode: Joi.string()
    }),
    to: Joi.object({
        name: Joi.string(),
        address: Joi.string(),
        city: Joi.string(),
        country: Joi.string(),
        postalCode: Joi.string()
    }),
    status: Joi.string().valid('In Transit', 'Delivered', 'Cancelled'),
    estimatedDelivery: Joi.string().isoDate(),
    _procurement: Joi.string().optional(),
    _inspection: Joi.string(),
    _client: Joi.string()
}).min(1);


module.exports = {
    createDTO,
    updateDTO
};
