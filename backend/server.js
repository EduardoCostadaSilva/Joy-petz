const express = require("express");
const app = express();
//parser para requisições content-type:
//application/x-www-form-urlencoded-json
app.use(express.urlencoded({ extended: true }));

//linhas das rotas
require("./app/routes/animal.routes")(app);
require("./app/routes/user_animal.routes")(app);
require("./app/routes/usuario.routes.js")(app);


app.get("/", (req, res) => {
  res.json({
    message: "API JP funcionando",
  });
});
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
