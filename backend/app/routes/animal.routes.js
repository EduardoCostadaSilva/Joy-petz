module.exports = (app) => {
  const animalController = require("../controllers/animal.controller.js");
  const auth = require("../middlewares/auth_jwt_middleware.js");

  app.post("/animais", animalController.create);
  app.get("/animais", animalController.findAll);
  app.get(
    "/animais/:id",
    [auth.verifyToken, auth.isAdmin],
    animalController.findById
  );
  app.put(
    "/animais/:id",
    [auth.verifyToken, auth.isAdmin],
    animalController.update
  );
  app.delete(
    "/animais/:id",
    [auth.verifyToken, auth.isAdmin],
    animalController.delete
  );
  app.delete(
    "/animais",
    [auth.verifyToken, auth.isAdmin],
    animalController.deleteAll
  );
};
