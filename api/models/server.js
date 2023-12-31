const path = require('path');
const cors = require('cors');
const express = require('express');
const router  = require('../routes/user.routes');
const connection = require('../database/config.db');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';
        this.origin = 'http://localhost:';

        //connection data base
        this.connectionDB();

        //middleware
        this.middlewares();

        //routes de mi app
        this.routes();
    }

    async connectionDB(){
        await connection();
    }

    middlewares(){

        //cors
        this.app.use(cors())

        //parseo y lectura del body
         this.app.use( express.json() );

        //directorio publico
        this.app.use(express.static(path.join(__dirname, '../../public')))
    }

    //routes
    routes(){
        this.app.use(this.userPath, router)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`${this.origin}${this.port}`)
        })
    }

}

module.exports = Server;