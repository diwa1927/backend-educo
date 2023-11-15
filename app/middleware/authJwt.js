const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const verifyToken = (req, res, next) => {
  //   const token = req.header("Authorization");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    delete user.password;
    req.user = user;
    next();
  });
};

// Middleware to decode JWT and attach user ID to request object
const decodeJwtMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Bearer token is required" });
  }

  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach decoded user ID to request object
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

isGuru = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "guru") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Guru Role!",
      });
    });
  });
};

isGuruOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "guru") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Guru or Admin Role!",
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isGuru: isGuru,
  isGuruOrAdmin: isGuruOrAdmin,
  decodeJwtMiddleware,
};
module.exports = authJwt;
