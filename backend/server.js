const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer')
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

const imageUploadPath = 'C:/Users/eduardo.silva29/Documentos/Joy_petz/backend/animais/image-upload/';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log('aqui2')
    cb(null, imageUploadPath)
  },
  filename: function(req, file, cb) {
    console.log('aqui');
    cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`)
  }
})

const imageUpload = multer({storage: storage})

//ADD EXPRESSS ROUTE
app.post('/image-upload', imageUpload.array("my-image-file"), (req, res) => {
  console.log('POST request received to /image-upload.');
  console.log('Axios POST body: ', req.body);
  res.send('POST request recieved on server to /image-upload.');
})


app.get("/", (req, res) => {
  res.json({
    message: "API JP funcionando",
  });
});

app.listen(3077, () => {
  console.log("Servidor rodando na porta 3077");
});
