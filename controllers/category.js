const { category } = require("../models");
const Joi = require("@hapi/joi");

// function for read all category
exports.read = async (req, res) => {
    try {
        const categori = await category.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });
        res.status(200).send({ data: categori });
    } catch (err) {
        res.status(500).send({ massage: "Internal server eror" });
    }
};

// function for add new category
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

        res.status(200).send({ data: categori });
    } catch (err) {
        res.status(200).send({ massage: "Internal Server Error" });
    }
};

// function for update new category
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const check = await category.findOne({
            where: { id }
        })
        if (!check) {
            res.status(404).send({ massage: "category not found" });
        }
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
        const categori = await category.update(req.body, {
            where: {
                id,
            },
        });
        if (categori < 1) {
            res.status(201).send({ massage: "request succes but no update" });
        }
        const { name } = req.body
        res.status(200).send({ data: { name, id } });
    } catch (err) {
        res.status(200).send({ massage: "Internal Server Error" });
    }
};

// function for delete category
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const categori = await category.destroy({
            where: {
                id,
            },
        });
        if (categori < 1) {
            res.status(400).send({ "massage": "Category not found" });
        }
        res.status(200).send({ data: { id } });
    } catch (err) {
        res.status(500).send({ massage: "Internal Server Error" });

    }
};
