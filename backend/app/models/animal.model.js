const sql = require("../configs/db");

// Construtor
const AnimalModel = function (animal) {
  this.nome = animal.nome;
  this.sexo = animal.sexo;
  this.idade = animal.idade;
  this.especie = animal.especie;
  //this.foto = animal.foto;
  this.descricao = animal.descricao;
  this.endereco = animal.endereco;
  this.contato = animal.contato;
};

// Cria um novo animal no banco de dados
AnimalModel.create = (animal, result) => {
  sql.query("INSERT INTO animais SET ?", animal, (err, res) => {
    if (err) {
      console.log("Erro: ", err);
      result(err, null);
      return;
    }
    console.log("Animal criado: ", { idanimal: res.insertId, ...animal });
    result(null, { idanimal: res.insertId, ...animal });
  });
};

// Seleciona um animal por ID
AnimalModel.findById = (id, result) => {
  sql.query("SELECT * FROM animais WHERE idanimal = ?", id, (err, res) => {
    if (err) {
      console.log("Erro: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Animal encontrado: ", res[0]);
      result(null, res[0]);
    } else {
      result({ type: "not_found" }, null);
      console.log("Animal não encontrado");
    }
  });
};

// Seleciona todos os animais
AnimalModel.getAll = (result) => {
  sql.query("SELECT * FROM animais", (err, res) => {
    if (err) {
      console.log("Erro: ", err);
      result(err, null);
      return;
    }
    console.log("Animais encontrados: ", res);
    result(null, res);
  });
};

// Atualiza um animal por ID
AnimalModel.updateById = (id, animal, result) => {
  sql.query(
    "UPDATE animais SET nome = ?, sexo = ?, idade = ?, especie = ?,endereco = ?, contato = ?, descricao = ? WHERE idanimal = ?",
    [
      animal.nome,
      animal.sexo,
      animal.idade,
      //animal.foto,
      animal.especie,
      animal.endereco,
      animal.contato,
      animal.descricao,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("Erro: ", err);
        result(err, null);
      } else if (res.affectedRows == 0) {
        result({ type: "not_found" }, null);
      } else {
        console.log("Animal atualizado: ", { idanimal: id, ...animal });
        result(null, { idanimal: id, ...animal });
      }
    }
  );
};

// Remove um animal por ID
AnimalModel.remove = (id, result) => {
  sql.query("DELETE FROM animais WHERE idanimal = ?", id, (err, res) => {
    if (err) {
      console.log("Erro: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ type: "not_found" }, null);
      return;
    }
    console.log("Animal deletado com o ID: ", id);
    result(null, res);
  });
};

// Remove todos os animais
AnimalModel.removeAll = (result) => {
  sql.query("DELETE FROM animais", (err, res) => {
    if (err) {
      console.log("Erro: ", err);
      result(err, null);
      return;
    }
    console.log(`Todos os animais foram deletados: ${res.affectedRows}`);
    result(null, res);
  });
};

module.exports = AnimalModel;
