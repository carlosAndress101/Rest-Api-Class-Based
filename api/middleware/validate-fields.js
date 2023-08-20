const boom = require("@hapi/boom");
const { request, response } = require("express");
const User = require('../models/user');

const validateFields = ( schema, req = request, res = response, next) => {
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    next();
}

const existEmail = async (email) => {
  try {
    const Email = await User.findOne({email})
    if(Email){
      throw boom.badRequest('This email already exists');
    }
  } catch (error) {
    throw boom.boomify(error);
  }
}

module.exports = {
    validateFields,
    existEmail

}