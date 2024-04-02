const animalModel = require("../models/animal.model.js");

exports.create = (req, res) => {
  if (
    !req.body.nome ||
    !req.body.sexo ||
    !req.body.idade ||
    !req.body.especie ||
    !req.body.descricao ||
    !req.body.endereco ||
    !req.body.contato
  ) {
    // Se algum campo estiver faltando, retorna um erro 400
    return res.status(400).json({
      message: "Campos do formulário estão incompletos.",
    });
  }

  const animal = {
    nome: req.body.nome,
    sexo: req.body.sexo,
    idade: req.body.idade,
    foto: req.file.path, // Salva o caminho do arquivo de imagem
    especie: req.body.especie,
    descricao: req.body.descricao,
    endereco: req.body.endereco,
    contato: req.body.contato,
  };

  animalModel.create(animal, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocorreu um erro",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findAll = (req, res) => {
  animalModel.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro desconhecido!",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findById = (req, res) => {
  animalModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.type == "not_found") {
        res.status(404).send({
          message: "Animal não encontrado. ID: " + req.params.id,
        });
      } else {
        res.status(500).send({
          message: "Erro ao retornar o Animal com ID: " + req.params.id,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.update = (req, res) => {
  if (
    !req.body.nome ||
    !req.body.sexo ||
    !req.body.idade ||
    !req.body.especie ||
    !req.body.descricao ||
    !req.body.endereco ||
    !req.body.contato
  ) {
    res.status(400).send({
      message: "Conteúdo do corpo da requisição vazia.",
    });
  } else {
    const animal = {
      nome: req.body.nome,
      sexo: req.body.sexo,
      idade: req.body.idade,
      foto: req.file.path, // Salva o caminho do arquivo de imagem
      especie: req.body.especie,
      descricao: req.body.descricao,
      endereco: req.body.endereco,
      contato: req.body.contato,
    };
    animalModel.updateById(req.params.id, animal, (err, data) => {
      if (err) {
        if (err.type == "not_found") {
          res.status(404).send({
            message: "Animal não encontrado.",
          });
        } else {
          res.status(500).send({
            message: "Erro ao atualizar o animal.",
          });
        }
      } else {
        res.send(data);
      }
    });
  }
};

exports.delete = (req, res) => {
  animalModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.type == "not_found") {
        res.status(404).send({ message: "Animal não encontrado." });
      } else {
        res.status(500).send({ message: "Erro ao deletar o animal." });
      }
    } else {
      res.send({ message: "Animal deletado com sucesso" });
    }
  });
};

exports.deleteAll = (req, res) => {
  animalModel.removeAll((err, data) => {
    if (err) {
      res.status(500).send({ message: "Erro ao deletar os animais." });
    } else {
      res.send({ message: "TODOS os Animais foram deletados com sucesso" });
    }
  });
};
