const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error)
                return res.status(400).json(result.error);

            if (!req.value) req.value = {};
            req.value['body'] = result.value;
            next();
        }
    },

    schemas: {
        signInSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/).required()
        }),
        signUpSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/).required(),
            name: Joi.string().min(3).max(30).required()
        })
    }
}
