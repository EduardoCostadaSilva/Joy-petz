var cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const uploadUser = require('./app/middlewares/uploadimage.js')
const app = express();
const fs = require("fs"); // Módulo File System do Node.js

//parser para requisições content-type:
//application/x-www-form-urlencoded-json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  app.use(cors());
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

app.get('/upload-image', (req,res) => {
  const imagePath = 'C:/Users/eduardo.silva29/Documents/Joy-petz/backend/app/uploads/1712077123364_cao-spitz-fofo.jpg'; // Substitua isso pelo caminho real da sua imagem

  // Verifica se o arquivo de imagem existe
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Se o arquivo não existir, retorna um erro 404 (Not Found)
      return res.status(404).json({ erro: true, mensagem: "Imagem não encontrada" });
    }

    // Se o arquivo existir, lê o conteúdo do arquivo
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        // Se ocorrer um erro ao ler o arquivo, retorna um erro 500 (Internal Server Error)
        return res.status(500).json({ erro: true, mensagem: "Erro ao ler a imagem" });
      }

      // Define o cabeçalho da resposta para indicar que o conteúdo é uma imagem
      res.setHeader('Content-Type', 'image/jpeg'); // Substitua 'image/jpeg' pelo tipo MIME correto da sua imagem

      // Envia a imagem como resposta
      res.send(data);
    });
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
