const jwt = require("jsonwebtoken");
const config = require("../configs/auth");
const usuarioModel = require("../models/usuario.model.js");

verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).send({
      message: "Não possui token para autenticação.",
    });
  } else {
    const [, token] = authorization.split(" ");
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: "Acesso não autorizado. Credenciais inválidas.",
        });
      } else {
        req.id = decoded.id;
        next();
      }
    });
  }
};
isAdmin = (req, res, next) => {
  usuarioModel.findById(req.id, (err, data) => {
    if (data.tipo == 1) {
      next();
    } else {
      res.status(403).send({
        message: "Você precisa ser administrador para executar a ação!",
      });
    }
  });
};


module.exports = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
