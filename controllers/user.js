const { user } = require("../models");

exports.read = async (req, res) => {
    try {
        const users = await user.findAll();

        res.send({ data: users });
    } catch (error) {
        console.log(error);
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

        res.send({ data: { id } });
    } catch (error) {
        console.log(error);
    }
};
