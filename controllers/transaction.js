
const { user, transaction } = require("../models");
const Joi = require("@hapi/joi");

exports.read = async (req, res) => {
    try {
        const transactions = await transaction.findAll({
            include: {
                model: user,
                as: "userID",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });
        res.status(200).send({ data: transactions });

    } catch (err) {
        res.status(500).send({ massage: "Internal Server Error" });
    }
};

exports.add = async (req, res) => {
    try {
        const User = await user.findOne({ where: { id: req.body.userId } })
        if (!User) {
            res.status(400).send({ massage: "user not found" });
        }
        const schema = Joi.object({
            startDate: Joi.date().required(),
            dueDate: Joi.date().required(),
            userId: Joi.number().required(),
            attach: Joi.string().required(),
            status: Joi.string().required()
        });
        const { error } = schema.validate(req.body);

        if (error)
            res.status(400).send({
                error: {
                    message: error.details[0].message,
                },
            });
        const transactions = await transaction.create(req.body);
        const getData = await transaction.findOne({
            where: {
                id: transactions.id,
            },
            include: {
                model: user,
                as: "userID",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["UserId", "userId", "createdAt", "updatedAt"],
            },
        });
        res.status(200).send({ data: getData });
    } catch (err) {
        res.status(500).send({ massage: "Internal Server Error" });
    }
};
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const check = await transaction.findOne({
            where: { id }
        })
        if (!check) {
            res.status(400).send({ massage: "transaction not found" });
        }
        const schema = Joi.object({
            startDate: Joi.date().required(),
            dueDate: Joi.date().required(),
            userId: Joi.number().required(),
            attach: Joi.string().required(),
            status: Joi.string().required()
        });
        const { error } = schema.validate(req.body);

        if (error)
            res.status(400).send({
                error: {
                    message: error.details[0].message,
                },
            });
        const coba = await transaction.update(req.body, {
            where: {
                id,
            }
        });
        if (coba < 1) {
            res.status(210).send({ massage: "transaction not found" });
        }
        const getData = await transaction.findOne({
            where: {
                id: id,
            },
            include: {
                model: user,
                as: "userID",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["UserId", "userId", "createdAt", "updatedAt"],
            },
        });
        res.status(200).send({ data: getData });
    } catch (err) {
        res.status(500).send({ massage: "Internal Server Error" });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const transactions = await transaction.destroy({
            where: {
                id,
            }
        });
        if (transactions < 1) {
            res.status(400).send({ massage: "transaction not found" });
        }
        res.status(400).send({ data: id });
    } catch (err) {
        res.status(500).send({ massage: "Internal Server Error" });
    }
};