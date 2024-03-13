const sql = require("../configs/db.js");
//Construtor
const UserAnimalModel = function (user_animal) {
  this.contato = user_animal.contato;
  this.endereco = user_animal.endereco;
  this.data = user_animal.data;
  this.animais_idanimal = user_animal.animais_idanimal;
  this.usuario_idusuario = user_animal.usuario_idusuario;
};

//Seleciona todos os produtos
UserAnimalModel.getAll = (result) => {
  sql.query("SELECT * FROM user_animal", (err, res) => {
    if (err) {
      console.log("erro: ", err);
      result(null, err);
      return;
    }
    console.log("user_animal: ", res);
    result(null, res);
  });
};

//Seleciona o produto por ID
UserAnimalModel.findById = (id, result) => {
  sql.query(
    "SELECT * FROM user_animal WHERE iduser_animal = " + id,
    (err, res) => {
      if (err) {
        console.log("erro: ", err);
        result(null, err);
        return;
      }
      if (res.length) {
        console.log("user_animal Encontrado", res[0]);
        result(null, res[0]);
      } else {
        result({ type: "not_found" }, null);
        console.log("user_animal não encontrado");
      }
    }
  );
};

//Cria novo produto no banco
UserAnimalModel.create = (user_animal, result) => {
  sql.query("INSERT INTO user_animal SET ?", user_animal, (err, res) => {
    if (err) {
      console.log("Erro: ", err);
      result(err, null);
      return;
    }
    console.log("user_animal criado: ", {
      iduser_animal: res.insertId,
      ...user_animal,
    });
    result(null, { iduser_animal: res.insertId, ...user_animal });
  });
};

//Atualizar produto por id
UserAnimalModel.updateById = (id, user_animal, result) => {
  sql.query(
    "UPDATE user_animal SET contato = ?, endereco = ?, data = ?, animais_idanimal = ?, usuario_idusuario = ?  WHERE iduser_animal = ?",
    [
      user_animal.contato,
      user_animal.endereco,
      user_animal.data,
      user_animal.animais_idanimal,
      user_animal.usuario_idusuario,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("erro: ", err);
        result(null, err);
      } else if (res.affectedRows == 0) {
        result({ type: "not_found" }, null);
      } else {
        console.log("user_animal atualizado: ", {
          iduser_animal: id,
          ...user_animal,
        });
        result(null, { iduser_animal: id, ...user_animal });
      }
    }
  );
};

//Remover produto por id
UserAnimalModel.remove = (id, result) => {
  sql.query(
    "DELETE FROM user_animal WHERE iduser_animal = ?",
    id,
    (err, res) => {
      if (err) {
        console.log("erro: ", err);
        result(err, null);
      } else if (res.affectedRows == 0) {
        result({ type: "not_found" }, null);
      } else {
        result(null, res);
      }
    }
  );
};

//Remover todos os produtos
UserAnimalModel.removeAll = (result) => {
  sql.query("DELETE FROM user_animal ", (err, res) => {
    if (err) {
      console.log("erro: ", err);
      result(err);
    } else {
      result(null);
    }
  });
};

module.exports = UserAnimalModel;
