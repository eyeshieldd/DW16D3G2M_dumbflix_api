const { episode, film, category } = require("../models");
const Joi = require("@hapi/joi");

// function for read all category
exports.read = async (req, res) => {
    try {
        const { id: filmId } = req.params;

        const Film = await episode.findAll({
            where: {
                filmId
            },
            include: {
                model: film,
                as: 'film',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'categoryId']
                },
                include: {
                    model: category,
                    as: 'category',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            },

            attributes: {
                exclude: ['createdAt', 'updatedAt', 'FilmId', 'filmId']
            }
        });
        if (!Film) {
            res.status(400).send({ massage: "Films not found" });
        }
        res.status(200).send({ data: Film });


    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Server Error' });
    }
};

// function for add new category
exports.readOne = async (req, res) => {
    try {
        const { idFilm, idEpisode } = req.params;

        const Film = await film.findOne({
            where: {
                id: idFilm
            }
        });
        console.log(Film)
        if (!Film) return res.status(400).send({ message: 'Film Not Found' });

        const Episode = await episode.findAll({
            where: {
                id: idEpisode
            },
            include: {
                model: film,
                as: 'film',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'categoryId']
                },
                include: {
                    model: category,
                    as: 'category',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            },

            attributes: {
                exclude: ['createdAt', 'updatedAt', 'FilmId', 'filmId']
            }
        });
        if (!Episode) {
            res.status(400).send({ massage: "Episode not found" });
        }
        res.status(200).send({ data: Episode });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Server Error' });
    }
};


exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const Episode = await episode.findOne({
            where: {
                id
            }
        });

        if (Episode) {
            await Episode.destroy({
                where: {
                    id
                }
            });

            return res.send({
                data: {
                    id
                }
            });
        } else {
            res.status(400).send({ message: 'Episode Not Found' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Server Error' });
    }
};

exports.add = async (req, res) => {
    try {
        const schema = Joi.object({
            title: Joi.string().min(3).required(),
            thumbnailFilm: Joi.string().required(),
            linkFilm: Joi.string().required(),
            filmId: Joi.number().required()
        });
        const { error } = schema.validate(req.body);

        if (error)
            return res.status(400).send({
                error: {
                    message: error.details[0].message
                }
            });

        const Episode = await episode.create(req.body);

        if (Episode) {
            const episodeResult = await episode.findOne({
                where: {
                    id: Episode.id
                },
                include: {
                    model: film,
                    as: 'film',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                attributes: { exclude: ['createdAt', 'updatedAt', 'filmId', 'FilmId'] }
            });

            return res.send({
                data: episodeResult
            });
        } else {
            return res.status(400).send({ message: 'Please Try Again' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Server Error' });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;

        const schema = Joi.object({
            title: Joi.string().min(3).required(),
            thumbnailFilm: Joi.string().required(),
            linkFilm: Joi.string().required(),
            filmId: Joi.number().required()
        });
        const { error } = schema.validate(req.body);

        if (error)
            return res.status(400).send({
                error: {
                    message: error.details[0].message
                }
            });

        const Episode = await episode.update(req.body, {
            where: {
                id
            }
        });

        if (Episode) {
            const episodeResult = await episode.findOne({
                where: {
                    id
                },
                include: {
                    model: film,
                    as: 'film',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'categoryId']
                    },
                    include: {
                        model: category,
                        as: 'category',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                },

                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'FilmId', 'filmId']
                }
            });
            return res.send({
                data: episodeResult
            });
        } else {
            return res.status(400).send({ message: 'Films Not Found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Server Error' });
    }
};