const router = require("express").Router()
const routersUser = require("./usuarioRoutes/usuarioRoutes")

router.use("/user", routersUser)

module.exports = router