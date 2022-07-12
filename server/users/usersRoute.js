const router = require("express").Router();
const { listAll, listOne, register, deleteOne, editOne, login } = require("./usersController")
const { validatorCreateUser, validatorEditUser } = require("../validators/users")
const uploadFile = require("../utils/handleStorage")


router.get("/", listAll)

router.get("/:id", listOne)

router.post("/register", uploadFile.single("file"), validatorCreateUser, register)

router.post("/login", login)

router.patch("/:id", uploadFile.single("file"), validatorEditUser, editOne)

router.delete("/:id", deleteOne)

module.exports = router