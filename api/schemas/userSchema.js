const Joi = require("joi");
const Role = require("../models/role");
const {existEmail} = require("../middleware/validate-fields");
const { response } = require("express");

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

module.exports = {
  createUserSchema,
};
