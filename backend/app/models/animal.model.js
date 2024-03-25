const sql = require("../configs/db");

//Construtor
const AnimalModel = function (animal) {
  this.nome = animal.nome;
  this.sexo = animal.sexo;
  this.idade = animal.idade;
  this.especie = animal.especie;
  //  this.foto = animal.foto;
  this.descricao = animal.descricao;
};

//Cria novo produto no banco
AnimalModel.create = (animal, result) => {
  sql.query("INSERT INTO animais SET ?", animal, (err, res) => {
    if (err) {
      console.log("Erro: ", err);
      result(err, null);
      return;
    }
    console.log("Animal postado: ", { idanimal: res.insertId, ...animal });
    result(null, { idanimal: res.insertId, ...animal });
  });
};

//Seleciona produto por ID
AnimalModel.findById = (id, result) => {
  sql.query("SELECT * FROM animais WHERE idanimal = " + id, (err, res) => {
    if (err) {
      console.log("erro: ", err);
      result(null, err);
      return;
    }
    if (res.length) {
      console.log("Animal Encontrado", res[0]);
      result(null, res[0]);
    } else {
      result({ type: "not_found" }, null);
      console.log("Animal não encontrado");
    }
  });
};

//Seleciona todos os produtos
AnimalModel.getAll = (result) => {
  sql.query("SELECT * FROM animais", (err, res) => {
    if (err) {
      console.log("erro: ", err);
      result(null, err);
      return;
    }
    console.log("animais: ", res);
    result(null, res);
  });
};

//Atualizar produto por id
AnimalModel.updateById = (id, animal, result) => {
  sql.query(
    "UPDATE animais SET nome = ?, sexo = ?, idade = ?, , especie = ?, descricao = ?",
    [
      animal.nome,
      animal.sexo,
      animal.idade,
      // animal.foto,
      animal.especie,
      animal.descricao,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("erro: ", err);
        result(null, err);
      } else if (res.affectedRows == 0) {
        result({ type: "not_found" }, null);
      } else {
        console.log("Animal atualizado: ", { idanimal: id, ...animal });
        result(null, { idanimal: id, ...animal });
      }
    }
  );
};

//Remover produto por id
AnimalModel.remove = (id, result) => {
  sql.query("DELETE FROM animais WHERE idanimal = ?", id, (err, res) => {
    if (err) {
      console.log("erro: ", err);
      result(err, null);
    } else if (res.affectedRows == 0) {
      result({ type: "not_found" }, null);
    } else {
      result(null, res);
    }
  });
};

//Remover todos os produtos
AnimalModel.removeAll = (result) => {
  sql.query("DELETE FROM animais ", (err, res) => {
    if (err) {
      console.log("erro: ", err);
      result(err);
    } else {
      result(null);
    }
  });
};

module.exports = AnimalModel;
