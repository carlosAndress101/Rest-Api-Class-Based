const bcrypt = require("bcrypt");
const User = require("../models/user");
const { response, request } = require("express");
const { all } = require("../routes/user.routes");

const getAllUsers = async (req = request, res = response) => {
  const { limit = 5} = req.query;
  const allUser = await User.find().limit(limit);
  const numUser = allUser.length
  res.json({
    numUser,
    allUser
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

const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...data } = req.body;

  //TODO validar contra base de datos
  if( password ){
    //Encript password
    data.password = await bcrypt.hash(password, 10);
  }

  const user = await User.findByIdAndUpdate(id, data);
  res.json({
    user,
  });
};

const initDelete = (req, res = response) => {
  res.json({
    message: "Hello Server Eliminar",
  });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  initDelete,
};
