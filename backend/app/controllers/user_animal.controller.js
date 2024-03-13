
const user_animalModel = require("../models/user_animal.models");

//Seleciona todos os usse_animal
exports.findAll = (req, res) => {
    user_animalModel.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro desconhecido!",
      });
    } else {
      res.send(data);
    }
  });
};

//Seleciona o produto_pedido por ID
exports.findById = (req, res) => {
  user_animalModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.type == "not_found") {
        res.status(404).send({
          message: " user_animal não encontrado. ID: " + req.params.id,
        });
      } else {
        res.status(500).send({
          message: "Erro ao retornar o user_animal com ID: " + req.params.id,
        });
      }
    } else {
      res.send(data);
    }
  });
};
//Cria novo produto_pedido no banco
exports.create = (req, res) => {
  if (
      !req.body.contato ||
      !req.body.endereco ||
      !req.body.data ||
      !req.body.animais_idanimal ||
      !req.body.usuario_idusuario
  ) {
    res.status(400).send({
      message: "Conteúdo do corpo da requisição vazia.",
    });
  } else {
    const user_animal = new user_animalModel({
        contato : req.body.contato,
        endereco : req.body.endereco,
        data : req.body.data,
        animais_idanimal : req.body.animais_idanimal,
        usuario_idusuario : req.body.usuario_idusuario,
    });
    user_animalModel.create(user_animal, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Ocorreu um erro",
        });
      } else {
        res.send(data);
      }
    });
  }
};
//Atualizar produto_pedido por id
exports.update = (req, res) => {
  if (
    !req.body.contato ||
      !req.body.endereco ||
      !req.body.data ||
      !req.body.animais_idanimal ||
      !req.body.usuario_idusuario
  ) {
    res.status(400).send({
      message: "Conteúdo do corpo da requisição vazia.",
    });
  } else {
    const user_animal = new user_animalModel({
        contato : req.body.contato,
        endereco : req.body.endereco,
        data : req.body.data,
        animais_idanimal : req.body.animais_idanimal,
        usuario_idusuario : req.body.usuario_idusuario,
    });
    user_animalModel.updateById(
      req.params.id,
      user_animal,
      (err, data) => {
        if (err) {
          if (err.type == "not_found") {
            res.status(404).send({
              message: "user_animal não encontrado.",
            });
          } else {
            res.status(500).send({
              message: "Erro ao atualizar user_animal.",
            });
          }
        } else {
          res.send(data);
        }
      }
    );
  }
};
//Remover produto por id
exports.delete = (req, res) => {
  user_animalModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.type == "not_found") {
        res.status(404).send({ message: "user_animal não encontrado." });
      } else {
        res.status(500).send({ message: "Erro ao deletar user_animal." });
      }
    } else {
      res.send({ message: "user_animal deletado com sucesso" });
    }
  });
};
//Remover todos os produtos
exports.deleteAll = (req, res) => {
    user_animalModel.removeAll((err, data) => {
    if (err) {
      res.status(500).send({ message: "Erro ao deletar user_animal." });
    } else {
      res.send({ message: "TODOS os user_animal deletado com sucesso" });
    }
  });
};
