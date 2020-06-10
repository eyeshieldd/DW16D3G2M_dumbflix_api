const express = require("express");
const router = express.Router();

const {
    read: findUsers,
    delete: deleteUsers
} = require("../controllers/user");
const { register } = require("../controllers/register");
const { login } = require("../controllers/login");



router.get("/users", findUsers)
    .delete("/user/:id", deleteUsers)



router.post("/register", register);
router.post("/login", login);


module.exports = router;
