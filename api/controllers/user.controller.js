const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");
const User = require("../models/user");
const { response, request } = require("express");

const initGet = (req = request, res = response) => {
  const { q, nombre, apiKey } = req.query;
  res.json({
    message: "Hello Server Obtener",
    q,
    nombre,
    apiKey,
  });
};

const createUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  try {

    //Encript password
    const passHash = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: passHash, role });

    //save DB
    await newUser.save();
    res.json(newUser);

  } catch (error) {
    return res.json(error.output);
  }
};

const initPut = (req = request, res = response) => {
  const id = req.params;
  res.json({
    message: "Hello Server Update",
    id,
  });
};

const initDelete = (req, res = response) => {
  res.json({
    message: "Hello Server Eliminar",
  });
};

module.exports = {
  initGet,
  createUser,
  initPut,
  initDelete,
};
