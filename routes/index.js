const express = require("express");
const router = express.Router();

const {
    read: findUsers,
    delete: deleteUsers
} = require("../controllers/user");
const { register } = require("../controllers/register");



router.get("/users", findUsers)
    .delete("/user/:id", deleteUsers)



router.post("/register", register);

// Authentication Routes

module.exports = router;
