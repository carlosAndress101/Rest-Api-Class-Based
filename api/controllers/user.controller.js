const { response, request } = require('express');

const initGet = (req = request , res = response)=>{
    const {q, nombre, apiKey} = req.query;
    res.json({
        message:"Hello Server Obtener",
        q,
        nombre,
        apiKey
    });
}
const initPost = (req = request, res = response)=>{
    const data = req.body;
    res.json({
        message:"Hello Server Create",
        data
        
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

