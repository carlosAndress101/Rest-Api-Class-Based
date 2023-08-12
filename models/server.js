const express = require('express');
const cors = require('cors');
const router  = require('../routes/user.routes');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';
        this.origin = 'http://localhost:';

        //middleware
        this.middlewares();

        //routes de mi app
        this.routes();
    }

    middlewares(){

        //cors
        this.app.use(cors())

        //parseo y lectura del body
         this.app.use( express.json() );

        //directorio publico
        this.app.use(express.static('public'))
    }

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