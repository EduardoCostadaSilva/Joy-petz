const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');

const app = express();

// configuração do multer
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Indica o diretório de destino
  },
  filename: function (req, file, cb) {
    // Gera um nome de arquivo único
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ dest: 'uploads/'});

app.post('/api/upload', upload.single('file'), (req, res) => {
  // Aqui você deve salvar o arquivo no banco de dados
  // req.file contém as informações do arquivo enviado
  console.log('File uploaded:', req.file);
  res.json({ message: 'Arquivo enviado com sucesso.' });
});

//parser para requisições content-type:
//application/x-www-form-urlencoded-json
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  app.use(cors());
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//linhas das rotas
require("./app/routes/animal.routes")(app);
require("./app/routes/user_animal.routes")(app);
require("./app/routes/usuario.routes.js")(app);


app.get("/", (req, res) => {
  res.json({
    message: "API JP funcionando",
  });
});
app.listen(3077, () => {
  console.log("Servidor rodando na porta 3077");
});
