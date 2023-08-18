const { response, request } = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const initGet = (req = request , res = response)=>{
    const {q, nombre, apiKey} = req.query;
    res.json({
        message:"Hello Server Obtener",
        q,
        nombre,
        apiKey
    });
}
const initPost = async (req = request, res = response)=>{
    const { name, email, password, role } = req.body;
    const passHash = await bcrypt.hash(password, 10);
    const newUser = new User({name, email, password:passHash, role});
    //await user.save();
    
    res.json({newUser});
}

const initPut = (req = request, res = response)=>{
    const id = req.params;
    res.json({
        message:"Hello Server Update",
        id
    });
}
const initDelete = (req, res = response)=>{
    res.json({
        message:"Hello Server Eliminar"
    });
}

module.exports = {
    initGet,
    initPost,
    initPut,
    initDelete
}

