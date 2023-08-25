const Joi = require("joi");
const boom = require("@hapi/boom");
const mongoose = require('mongoose');
const Role = require("../models/role");
const User = require("../models/user");
const { existEmail } = require("../middleware/validate-fields");

const id = Joi.string();
const name = Joi.string().min(3);
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(8);

const createUserSchema = Joi.object({
  name: name.required().messages({
    "string.base": "El nombre de usuario debe ser un texto",
    "string.min": "El nombre de usuario debe tener al menos 3 caracteres",
    "any.required": "El nombre de usuario es un campo obligatorio",
  }),
  email: email.required().custom((email)=>{
      existEmail(email);
  }).messages({
    "string.base": "El correo electrónico debe ser un texto",
    "string.email": "El formato del correo electrónico es inválido",
    "any.required": "El correo electrónico es un campo obligatorio",
  }),
  password: password.required().messages({
    "any.required": "El password es un campo obligatorio",
    "string.min": "El password debe tener al menos 8 caracteres",
  }),
  role: role.required()
    .custom(async (role) => {
      try {
        const data = await Role.findOne({ role });
        if (!data) {
          throw new Error(`El rol ${role} no está registrado`);
        }
      } catch (error) {
        throw new Error("Error al obtener roles válidos");
      }
    })
    .messages({
      "any.required": "El rol es un campo obligatorio",
      "string.base": "El rol debe ser un texto",
      "string.min": "El password debe tener al menos 8 caracteres"
    }),
});

const updateUserSchema = Joi.object({
  _id: id.custom((value, helpers)=> {
    if(!mongoose.Types.ObjectId.isValid(value)){
      return helpers.error(`any.invalid -> ${value}`)
    }
    return value;
  }),
  name: name.messages({
    "string.base": "El nombre de usuario debe ser un texto",
    "string.min": "El nombre de usuario debe tener al menos 3 caracteres",
  }),
  email: email.messages({
    "string.base": "El correo electrónico debe ser un texto",
    "string.email": "El formato del correo electrónico es inválido",
  }),
  role: role.custom(async (role) => {
    try {
      const data = await Role.findOne({ role });
      if (!data) {
        throw new Error(`El rol ${role} no está registrado`);
      }
    } catch (error) {
      throw new Error("Error al obtener roles válidos");
    }
  })
  .messages({
    "string.base": "El role debe ser un texto",
    "string.min": "El role debe tener al menos 8 caracteres"
  }),
});

const deleteUserSchama = Joi.object({
  _id: id.custom((value)=> {
    try {
      if(!mongoose.Types.ObjectId.isValid(value)){
        throw boom.badRequest(`any.invalid -> ${value}`);
      }
      return value;
    } catch (error) {
      return error
    }
  }).custom(async (id) => {
    try {
      const user = await User.findById(id)
      if(!user){
        throw new Error('User not found');
      }
    } catch (error) {
      return error;
    }
  }).messages({
    "string.pattern.base": "El ID debe tener el formato adecuado",
  }),
})




module.exports = {
  createUserSchema,
  updateUserSchema,
  deleteUserSchama
};
