const axios = require("axios");
const Code = require("../models/code.model");

exports.codeCompile = async (req, res) => {
  let code = req.body.code;
  let userInput = req.body.userInput;
  let data = {
    files: [
      {
        name: `main.cpp`,
        content: code,
      },
    ],
    stdin: userInput,
  };
  let config = {
    method: "post",
    url: `https://glot.io/api/run/cpp/latest`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.GLOT_TOKEN}`,
    },
    data: data,
  };
  await axios(config)
    .then((response) => {
      return res.status(200).json({ status: 200, data: response.data });
    })
    .catch(() => {
      return res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.saveCompile = async (req, res) => {
  try {
    const { name, userCode, userInput } = req.body;
    const savedCode = await Code.create({ name, userCode, userInput });
    res.json(savedCode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save code" });
  }
};

exports.getAllCodes = async (_, res) => {
  try {
    const codes = await Code.findAll();
    res.json(codes);
  } catch (error) {
    console.error("Failed to fetch data Code :", error);
    res.status(500).json({ error: "Failed to fetch Codes" });
  }
};

exports.getCodeById = async (req, res) => {
  try {
    const codeId = req.params.id;
    const code = await Code.findByPk(codeId);
    if (!code) {
      res.status(404).json({ error: "Code not found." });
    } else {
      res.json(code);
    }
  } catch (error) {
    console.error("Failed to fetch Code data", error);
    res.status(500).json({ error: "Failed to fetch data." });
  }
};

exports.updateCodeById = async (req, res) => {
  const codeId = req.params.id;
  const updateCode = req.body;
  try {
    const code = await Code.findByPk(codeId);
    if (!code) {
      res.status(404).json({ error: "Code not found." });
    }
    // Update data
    await code.update(updateCode);
    // Kirim respons berhasil
    res.status(200).json({ message: "Code updated successfully." });
  } catch (error) {
    console.error("Error updating code:", error);
    res.status(500).json({ error: "Failed to update." });
  }
};

exports.deleteCodeById = async (req, res) => {
  const codeId = req.params.id;
  try {
    const code = await Code.findByPk(codeId);

    if (!code) {
      res.status(404).json({ error: "Code not found." });
    } else {
      await code.destroy(); //menghapus data dari database
      res.status(200).json({ message: "Code delete successfully." });
    }
  } catch (error) {
    console.error("Failed to delete file:", error);
    res.status(500).json({ error: "Failed to delete code." });
  }
};
