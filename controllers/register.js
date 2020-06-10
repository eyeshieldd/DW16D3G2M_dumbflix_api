const { user } = require("../models");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const schema = Joi.object({
            fullName: Joi.string().alphanum().min(3).required(),
            email: Joi.string().email().min(6).required(),
            password: Joi.string().min(6).required(),
            gender: Joi.string().required(),
            phone: Joi.string().required(),
            address: Joi.string().required()
        });
        const { error } = schema.validate(req.body);

        if (error)
            return res.status(400).send({
                error: {
                    message: error.details[0].message,
                },
            });

        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const users = await user.create({ ...req.body, password: hashedPassword });
        const token = jwt.sign({ id: users.id }, process.env.SECRET_KEY);

        res.send({
            data: {
                email,
                token,
            },
        });
    } catch (error) {
        console.log(error);
    }
};
