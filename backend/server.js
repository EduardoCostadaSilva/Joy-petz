const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const uploadUser = require('./app/middlewares/uploadimage.js')
const app = express();

//parser para requisições content-type:
//application/x-www-form-urlencoded-json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOrigin = 'http://localhost:3077';
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  app.use(cors({
  origin: [corsOrigin],
  methods:['GET', 'POST'],
  credentials: true
}))
  next();
 });


//linhas das rotas
require("./app/routes/animal.routes")(app);
require("./app/routes/user_animal.routes")(app);
require("./app/routes/usuario.routes.js")(app);


//ADD EXPRESSS ROUTE
app.post('/upload-image', uploadUser.single("image"), async (req, res) => {
  if(req.file) {
    return res.json({
      erro: false,
    mensagem:"Upload sendo relizado!!"
  })
  }
  return res.status(400).json({
    erro:true,
    mensagem : "Erro: Upload não realizado com sucesso!"
  });

})


app.get("/", (req, res) => {
  res.json({
    message: "API JP funcionando",
  });
});

app.listen(3077, () => {
  console.log("Servidor rodando na porta 3077");
});
