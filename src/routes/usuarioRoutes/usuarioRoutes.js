const router = require("express").Router()
const usuarioModel = require("../../models/usuario/UsuarioModel")


 router.route("/create").get( async (req, res) => {
    const datauser = {
        nome: "joao"
    }
   const resultUser = await usuarioModel.create(datauser)

   res.send(resultUser)
}

)



module.exports = router