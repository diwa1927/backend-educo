const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Role = require("../models/role.model");

exports.signup = async (req, res) => {
  const { username, email, password, roleId } = req.body;
  // Validate the request body (add more validation as needed)
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, role, and password are required." });
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create a new user with associated role
  await User.create({
    username,
    email,
    password: hashedPassword,
    roleId: Number(roleId),
  })
    .then(async (user) => {
      const { roleId, ...rest } = user.toJSON();
      user.save();
      res.status(201).json({ roleId: Number(roleId), ...rest }); // Respond with status 201 and the created user
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
      include: Role,
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    let passwordIsValid = bcrypt.compare(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    const token = jwt.sign({ id: user.id }, `${process.env.SECRET_KEY ?? ""}`, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });
    const foundUser = user.toJSON();
    delete foundUser.password;
    res.status(200).send({
      ...foundUser,
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error, message: "Internal Server Error" });
  }
};
