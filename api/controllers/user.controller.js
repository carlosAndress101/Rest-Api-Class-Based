const { response, request } = require('express');
const User = require('../models/user');

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
    const body = req.body;
    const user = new User(body);
    await user.save();
    res.json({
        user
    });
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

