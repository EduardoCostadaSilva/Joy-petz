module.exports = (app) => {
  const user_animalController = require("../controllers/user_animal.controller.js");
  const auth = require("../middlewares/auth_jwt_middleware.js");

  app.post("/user_animal", user_animalController.create);
  app.get("/user_animal", user_animalController.findAll);
  app.get("/user_animal/:id", user_animalController.findById);
  app.put(
    "/user_animal/:id",
    [auth.verifyToken, auth.isAdmin],
    user_animalController.update
  );
  app.delete(
    "/user_animal/:id",
    [auth.verifyToken, auth.isAdmin],
    user_animalController.delete
  );
  app.delete(
    "/user_animal",
    [auth.verifyToken, auth.isAdmin], 
    user_animalController.deleteAll
  );
};
