const express = require("express");
const router = express.Router();
const { middleware, authAdmin, } = require("../middleware/middleware");

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
const {
    add: addEpisode,
    read: readEpisode,
    update: editEpisode,
    readOne: getDetail,
    delete: deleteEpisode,

} = require("../controllers/episode");

const { register } = require("../controllers/register");
const { login } = require("../controllers/login");



router.get("/users", findUsers)
    .delete("/user/:id", deleteUsers)

router.get("/category", findCategory)
    .post("/category", middleware, authAdmin, addCategory)
    .patch("/category/:id", middleware, authAdmin, updateCategory)
    .delete("/category/:id", middleware, authAdmin, deleteCategory)

router.get("/transactions", findTransaction)
    .post("/transactions", middleware, authAdmin, addTransaction)
    .patch("/transaction/:id", middleware, authAdmin, updateTransaction)
    .delete("/transaction/:id", middleware, authAdmin, deleteTransaction)

router.get("/film/:id/episodes", middleware, authAdmin, readEpisode)
router.post('/episode', middleware, authAdmin, addEpisode);
router.get("/film/:idFilm/episodes/:idEpisode", middleware, authAdmin, getDetail);
router.delete("/episode/:id", middleware, authAdmin, deleteEpisode);
router.get("/episode/:id", middleware, authAdmin, editEpisode);



router.get("/films", readFilm)
    .get("/film/:id", readOne)
    .post("/films", middleware, authAdmin, addFilm)
    .patch("/film/:id", middleware, authAdmin, updateFilm)
    .delete("/film/:id", middleware, authAdmin, deleteFilm)

router.post("/register", register)
    .post("/login", login)

module.exports = router;
