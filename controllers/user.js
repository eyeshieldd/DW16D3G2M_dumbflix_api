const { user } = require("../models");

exports.read = async (req, res) => {
    try {
        const users = await user.findAll({
            // attributes: {
            //     exclude: ["role"],
            // }
        });
        res.status(200).send({ data: users });

    } catch (err) {
        res.status(500).send({ massage: "Internal Server Error" });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const users = await user.destroy({
            where: {
                id,
            },
        });
        if (users < 1) {
            res.status(400).send({ massage: "User not found" });
        }
        res.status(200).send({ data: { id } });
    } catch (err) {
        res.status(500).send({ massage: "Internal Server Error" });
    }
};
