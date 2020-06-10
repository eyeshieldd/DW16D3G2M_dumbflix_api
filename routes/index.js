const express = require("express");
const router = express.Router();

const {
    read: findUsers,
    delete: deleteUsers
} = require("../controllers/user.js");


// User Routes
router.get("/users", findUsers);
router.delete("/user/:id", deleteUsers);


// Authentication Routes

module.exports = router;
