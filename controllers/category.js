const { category } = require("../models");
const Joi = require("@hapi/joi");

exports.read = async (req, res) => {
    try {
        const categori = await category.findAll();

        res.send({ data: categori });
    } catch (error) {
        console.log(error);
    }
};
exports.add = async (req, res) => {
    try {
        const schema = Joi.object({
            name: Joi.string().alphanum().required(),
        });
        const { error } = schema.validate(req.body);
        if (error)
            res.status(400).send({
                error: {
                    message: error.details[0].message,
                },
            });
        const categori = await category.create(req.body);

        res.send({ data: categori });
    } catch (error) {
        console.log(error);
    }
};


exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        // const { name } = req.body;
        const categori = await category.update(req.body, {
            where: {
                id:id,
            },
        });
        if (categori) {
            res.send({
                data: {
                    categori
                }
            });

        }
        console.log(categori);
    } catch (error) {
        console.log(error);
    }
};
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const categori = await category.destroy({
            where: {
                id,
            },
        });

        res.send({ data: { categori } });
    } catch (error) {
        console.log(error);
    }
};
