
const { film, category } = require("../models");
const Joi = require("@hapi/joi");

exports.read = async (req, res) => {
    try {
        const films = await film.findAll({
            include: {
                model: category,
                as: "category",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["CategoryId", "categoryId", "createdAt", "updatedAt", "role"],
            },
        });
        res.status(200).send({ data: films });
    } catch (err) {
        res.status(500).send({ massage: "Internal Server Error" });

    }
};
exports.readOne = async (req, res) => {
    try {
        const { id } = req.params;
        const films = await film.findOne({
            where: {
                id,
            }, include: {
                model: category,
                as: "category",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["CategoryId", "categoryId", "createdAt", "updatedAt", "role"],
            },

        });
        if (films < 1) {
            res.status(400).send({ massage: "Id not found" });
        }
        res.status(200).send({ data: films });
    } catch (err) {
        res.status(500).send({ massage: "Internal Server Error" });
    }
};

exports.add = async (req, res) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required(),
            thumbnailFilm: Joi.string(),
            year: Joi.number().required(),
            categoryId: Joi.number().required(),
            description: Joi.string()
        });
        const { error } = schema.validate(req.body);
        if (error)
            res.status(400).send({
                error: {
                    message: error.details[0].message,
                },
            });
        const Category = await category.findOne({ where: { id: req.body.categoryId } })

        if (!Category) {
            res.status(400).send({ massage: "film not found" });
        }

        const films = await film.create(req.body);

        const insert = await film.findOne({
            where: {
                id: films.id,
            }, include: {
                model: category,
                as: "category",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["CategoryId", "categoryId", "createdAt", "updatedAt", "role"],
            },
        })

        res.status(200).send({ data: insert });

    } catch (err) {
        res.status(500).send({ massage: "Internal Server Error" });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await film.findOne({
            where: { id }
        })
        if (!data) {
            res.status(400).send({ massage: "Film not found" });

        }
        const schema = Joi.object({
            title: Joi.string().required(),
            thumbnailFilm: Joi.string(),
            year: Joi.number().required(),
            categoryId: Joi.number().required(),
            description: Joi.string()
        });
        const { error } = schema.validate(req.body);

        if (error)
            res.status(400).send({
                error: {
                    message: error.details[0].message,
                },
            });
        const update = await film.update(
            req.body,
            { where: { id: data.id } }
        )
        if (update < 1) {
            res.status(201).send({ massage: "film not found" });
        }
        const getData = await film.findOne({
            where: {
                id: id,
            }, include: {
                model: category,
                as: "category",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["CategoryId", "categoryId", "createdAt", "updatedAt", "role"],
            },
        })
        res.status(200).send({ data: getData });
    } catch (err) {
        res.status(500).send({ massage: "Internal Server Error" });
    }
};
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await film.destroy({
            where: {
                id,
            }
        });
        if (deleted < 1) {
            res.status(404).send({ massage: "film not found" });
        }
        res.status(200).send({ data: { id } });
    } catch (err) {
        res.status(500).send({ massage: "Internal Server Error" });
    }
};