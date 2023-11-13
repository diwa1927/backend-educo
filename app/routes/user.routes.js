const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (_, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/test/all", controller.allAccess);

  app.get("/api/users/:id", [authJwt.verifyToken], controller.getUserById);
  // app.get("/api/test/siswa", [authJwt.verifyToken], controller.siswaBoard);
};
