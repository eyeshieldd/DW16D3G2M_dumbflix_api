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

const {
    read: findTransaction,
    add: addTransaction,
    update: updateTransaction,
    delete: deleteTransaction
} = require("../controllers/transaction");

const {
    add: addFilm,
    read: readFilm,
    update: updateFilm,
    readOne: readOne,
    delete: deleteFilm,

} = require("../controllers/film");

const { register } = require("../controllers/register");
const { login } = require("../controllers/login");



router.get("/users", findUsers)
    .delete("/user/:id", deleteUsers)



router.get("/category", findCategory)
    .post("/category", middleware, addCategory)
    .patch("/category/:id", middleware, updateCategory)
    .delete("/category/:id", middleware, deleteCategory)

router.get("/transactions", findTransaction)
    .post("/transactions", middleware, addTransaction)
    .patch("/transaction/:id", middleware, updateTransaction)
    .delete("/transaction/:id", middleware, deleteTransaction)


router.get("/films", readFilm)
    .get("/film/:id", readOne)
    .post("/films", middleware, addFilm)
    .patch("/film/:id", middleware, updateFilm)
    .delete("/film/:id", middleware, deleteFilm)

router.post("/register", register);
router.post("/login", login);




module.exports = router;
