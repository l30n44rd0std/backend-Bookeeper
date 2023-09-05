const router = require("express").Router();
const axios = require("axios");
const userModel = require("../../models/user/UserModel");
const favBookModel = require("../../models/favBook/favBookModel");
const { authenticationUser, ensureAuthenticated } = require("../../middleware/AuthenticationUser");

// rota de regsitro de um usuário
router.route("/register").post(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(`body: ${req.body}`);
  const dataUser = {
    username: username,
    email: email,
    password: password
  }
  console.log(dataUser)
  
  try {
    const resultUser = await userModel.create(dataUser);
    res.send(resultUser);
  } catch (err) {
    console.log(`Erro: ${err}`);
    res.json(err);
  }
});

// rota de login do usuário
router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await userModel.findOne({where: { email: email, password: password },});

      if(user.password === password) {
        try{
            const responseDataUser = authenticationUser({email: email, password: password});
            console.log(responseDataUser);
            return res.json({email:email, statusLogin: true, ...responseDataUser})
        } catch(err){
            return res.status(401).json({msg: 'Algo deu errado, tente novamente'})
        }
      } else {
        res.json({msg:'Senha incorreta'})
      }
  } catch (err){
    res.json({msg:'Usuário não encontrado. E-mail e/ou senha incorretos.'})
  }
})

//rota para atualizar info(e-mail ou password) do usuário
router.route("/:id/update").put(ensureAuthenticated, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    //se o user atualizar apenas o e-mail
    if (email) {
      user.email = email;
    }
    //se o usuário atualizar apenas a password
    if (password) {
      user.password = password;
    }

    await user.save();
    return res.status(200).json({ message: "Sucesso! Informações do usuário foram atualizadas." });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar informações do usuário." });
  }
});

//rota para página de perfil do usuário
router.route("/:id/profile").get(ensureAuthenticated, async (req, res) => {
  try {
    const user = await userModel.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    res.json({ username: user.username, email: user.email });
  } catch (err) {
    console.error(`Error ao buscar perfil do usuário: ${err}`);
    res.status(500).json({ message: "Erro ao buscar perfil do usuário." });
  }
});

//rota para criar um livro favorito na biblioteca pessoal do usuário
//cada usuário tem uma lista de livros favoritos
//*LivrosFavModel: cada livro favorito tem o id do usuário e id do livro na API do Google (Google Books)
router.route("/:id/favbooks/create").post(ensureAuthenticated, async (req, res) => {
  try {
    const book = await favBookModel.create({...req.body, user_id: req.params.id});
    res.send(book);
  } catch (err) {
    console.error(`Error ao criar livro favorito: ${err}`);
    res.status(500).json({ message: "Erro ao criar livro favorito" });
  }
});

//rota para exibir livros favoritos do usuário
router.route("/:id/favbooks").get(ensureAuthenticated, async (req, res) => {
  try {
    const resultBooks = await favBookModel.findAll(req.params.id);
    res.send(resultBooks);
  } catch (err) {
    console.error(`Error ao exibir livros favoritos: ${err}`);
    res.status(500).json({ message: "Erro ao exibir livros favoritos" });
  }
});

//rota para atualizar status do livro (ex: lendo p/ finalizado, quero ler p/lendo...)
router.route("/:id/favbooks/:id").put(ensureAuthenticated, async (req, res) => {
  const { status } = req.body;
  const { userId, bookId } = req.params;

  try {
    const favBook = await favBookModel.findOne({where: {id: bookId, user_id: userId}});

    if(!favBook) {
      return res.status(404).json({message: "Livro favorito não encontrado"});
    }

    favBook.status = status;
    await favBook.save();

    res.json({ message: "Status do livro atualizado com sucesso", favBook });
  } catch (err) {
    console.error(`Error ao atualizar: ${err}`);
    res.status(500).json({ message: "Erro ao atualizar status do livro" });
  }
});

//rota para deletar um livro favorito
router.route("/:id/favbooks/:idbook").delete(ensureAuthenticated, async (req, res) => {
  try {
    const favBook = await favBookModel.findByPk(req.params.idbook);
    if (!favBook) {
      return res.status(404).json({ message: "Livro favorito não encontrado" });
    }

    await favBook.destroy();
    res.status(204).send();
  } catch (err) {
    console.error(`Error ao deletar livro favorito: ${err}`);
    res.status(500).json({ message: "Erro ao deletar livro favorito" });
  }
});

router.route("/listallusers").get(ensureAuthenticated, async (req, res) => {
  try {
      const allUsers = await userModel.findAll();
      res.json(allUsers);
  } catch (err) {
    return res.status(500).json({ message: "Erro ao listar todos usuários." });
  }
})

module.exports = router;
