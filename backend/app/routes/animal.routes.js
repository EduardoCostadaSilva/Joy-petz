module.exports = (app) => {
  const produtoController = require("../controllers/animal.controller.js");
  const auth = require("../middlewares/auth_jwt_middleware.js");

  app.post("/animais", produtoController.create);
  app.get("/animais", produtoController.findAll);
  app.get(
    "/animais/:id",
    [auth.verifyToken, auth.isAdmin],
    produtoController.findById
  );
  app.put(
    "/animais/:id",
    [auth.verifyToken, auth.isAdmin],
    produtoController.update
  );
  app.delete(
    "/animais/:id",
    [auth.verifyToken, auth.isAdmin],
    produtoController.delete
  );
  app.delete(
    "/animais",
    [auth.verifyToken, auth.isAdmin],
    produtoController.deleteAll
  );
};
