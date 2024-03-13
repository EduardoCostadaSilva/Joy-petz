module.exports = app => {
    const produtoController = require("../controllers/animal.controller.js");
    app.post("/animais", produtoController.create);
    app.get("/animais", produtoController.findAll);
    app.get("/animais/:id", produtoController.findById);
    app.put("/animais/:id", produtoController.update);
    app.delete("/animais/:id", produtoController.delete);
    app.delete("/animais", produtoController.deleteAll);
    }