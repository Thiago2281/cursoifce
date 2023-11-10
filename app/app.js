const http = require('http');
const PoligonosController = require('./controllers/PoligonosControllers');
const EstaticoController = require('./controllers/EstaticoController');
const AutorController = require('./controllers/AutorController');
const AuthController = require('./controllers/AuthController');
const PoligonosDao = require('./lib/projeto/PoligonosDao');
require("dotenv").config();

let poligonosDao = new PoligonosDao();
let poligonosController = new PoligonosController(poligonosDao);
let estaticoController = new EstaticoController();
let autorController = new AutorController();
let authController = new AuthController(poligonosDao);

const PORT = 3000;
const server = http.createServer((req, res) => {
    let [url, querystring] = req.url.split('?');
    let urlList = url.split('/');
    url = urlList[1];
    let metodo = req.method;

    if (url=='index') {
        poligonosController.index(req, res);
    }
    else if (url=='area') {
        poligonosController.area(req, res);
    }

    else if (url == 'poligonos' && metodo == 'GET') {
        poligonosController.listar(req, res);
    }
    else if (url == 'poligonos' && metodo == 'POST') {
        poligonosController.inserir(req, res);
    }
    else if (url == 'poligonos' && metodo == 'PUT') {
        authController.autorizar(req, res, function() {
            poligonosController.alterar(req, res);
        }, ['admin', 'geral']);
    }
    else if (url == 'poligonos' && metodo == 'DELETE') {
        authController.autorizar(req, res, function() {
            poligonosController.apagar(req, res);
        }, ['admin']);
    }

    else if (url=='autor') {
        autorController.autor(req, res);    
    }

    else if (url == 'login') {
        authController.index(req, res);
    }
    else if (url == 'logar') {
        authController.logar(req, res);
    }    
    else {
        estaticoController.naoEncontrado(req, res);   
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});