const express = require("express");
const router = express.Router();
const { middleware } = require("../middleware/middleware");

const {
    read: findUsers,
    delete: deleteUsers
} = require("../controllers/user");

const {
    read: findCategory,
    add: addCategory,
    update: updateCategory,
    delete: deleteCategory
} = require("../controllers/category");

const { register } = require("../controllers/register");
const { login } = require("../controllers/login");



router.get("/users", findUsers)
    .delete("/user/:id", deleteUsers)



router.get("/category", findCategory)
    .post("/category",middleware, addCategory)
    .patch("/category/:id",middleware, updateCategory)
    .delete("/category/:id",middleware, deleteCategory)



router.post("/register", register);
router.post("/login", login);




module.exports = router;
