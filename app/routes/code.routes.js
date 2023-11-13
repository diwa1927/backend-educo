const controller = require("../controllers/code.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.post("/api/compile", [authJwt.verifyToken], controller.codeCompile);
  app.post("/api/save-compile", [authJwt.verifyToken], controller.saveCompile);
  app.get("/api/codes", [authJwt.verifyToken], controller.getAllCodes);
  app.get("/api/codes/:id", [authJwt.verifyToken], controller.getCodeById);
  app.put("/api/codes/:id", [authJwt.verifyToken], controller.updateCodeById);
  app.delete(
    "/api/codes/:id",
    [authJwt.verifyToken],
    controller.deleteCodeById
  );
};
