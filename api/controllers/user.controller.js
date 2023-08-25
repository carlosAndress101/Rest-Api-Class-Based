const bcrypt = require("bcrypt");
const User = require("../models/user");
const { response, request } = require("express");

const getAllUsers = async (req = request, res = response) => {
  const { limit = 5, offset = 0 } = req.query;
  const query = { state: true };

  try {
    const [total, user] = await Promise.all([
      User.countDocuments(query),
      User.find(query).skip(offset).limit(limit),
    ]);
  
    res.json({
      total,
      user,
    });
  } catch (error) {
    res.status(400).json(error.message)
  }
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
  try {
    if (password) {
      //Encript password
      data.password = await bcrypt.hash(password, 10);
    }
  
    const user = await User.findByIdAndUpdate(id, data);
    res.json({
      user,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;
  //physically eliminated
  try {
    const userDelete = await User.findByIdAndUpdate(id, {state: false});
    res.json(userDelete);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
