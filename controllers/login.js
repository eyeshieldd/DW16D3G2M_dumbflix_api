const { user } = require("../models");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().min(6).required(),
            password: Joi.string().min(6).required(),
        });
        const { error } = schema.validate(req.body);

        if (error)
            res.status(400).send({
                error: {
                    message: error.details[0].message,
                },
            });

        const { email, password } = req.body;
        const users = await user.findOne({
            where: { email },
        });
        if (!users) return res.status(201).send({ message: "Invalid Login" });

        console.log(users)
        const validPass = await bcrypt.compare(password, users.password);

        if (!validPass) return res.status(400).send({ message: "Invalid Login" });

        const token = jwt.sign({ id: users.id }, process.env.SECRET_KEY);

        res.send({
            data: {
                email,
                token,
            },
        });
    } catch (err) {
        res.status(500).send({ massage: "Internal Server Error" });
    }
};