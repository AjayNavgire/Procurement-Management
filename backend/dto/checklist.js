const Joi = require("joi");

const createDTO = Joi.object({
    order: Joi.string().required(),
    _client: Joi.string().required(),
    questions: Joi.array().items(Joi.object({
        question: Joi.string().required(),
        type: Joi.string().valid('boolean', 'dropdown', 'multipleChoice', 'text').required(),
        options: Joi.when('type', {
            is: Joi.string().valid('dropdown', 'multipleChoice'),
            then: Joi.array().items(Joi.string())
        }),
        required: Joi.boolean().default(false),
        answer: Joi.any()
    })),
    imageBeforeLoading: Joi.object({
        publice_id: Joi.string(),
        url: Joi.string()
    }),
    imageAfterLoading: Joi.object({
        publice_id: Joi.string(),
        url: Joi.string()
    }),
    summary: Joi.string()
});

const updateDTO = Joi.object({
    order: Joi.string(),
    _client: Joi.string(),
    questions: Joi.array().items(Joi.object({
        question: Joi.string(),
        type: Joi.string().valid('boolean', 'dropdown', 'multipleChoice', 'text'),
        options: Joi.when('type', {
            is: Joi.string().valid('dropdown', 'multipleChoice'),
            then: Joi.array().items(Joi.string())
        }),
        required: Joi.boolean(),
        answer: Joi.any()
    })),
    imageBeforeLoading: Joi.object({
        publice_id: Joi.string(),
        url: Joi.string()
    }),
    imageAfterLoading: Joi.object({
        publice_id: Joi.string(),
        url: Joi.string()
    }),
    summary: Joi.string()
}).min(1); 


module.exports = {
    createDTO,
    updateDTO,
}