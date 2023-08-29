const router = require("express").Router()
const routersUser = require("./user/index")

router.use("/user", routersUser)

module.exports = router