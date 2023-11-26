const http = require('http');
const PoligonosController = require('./controllers/PoligonosControllers');
const EstaticoController = require('./controllers/EstaticoController');
const AutorController = require('./controllers/AutorController');
const AuthController = require('./controllers/AuthController');
const PoligonosDao = require('./lib/projeto/PoligonosDao');
const UsuariosController = require('./controllers/UsuariosControllers');
const UsuariosDao = require('./lib/projeto/UsuariosDao');
const PoligonosMysqlDao = require('./lib/projeto/PoligonosMysqlDao');
const UsuariosMysqlDao = require('./lib/projeto/UsuariosMysqlDao');
const mysql = require('mysql');

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'bd',
    user            : process.env.MARIADB_USER,
    password        : process.env.MARIADB_PASSWORD,
    database        : process.env.MARIADB_DATABASE
});

let poligonosDao = new PoligonosMysqlDao(pool);
let usuariosDao = new UsuariosMysqlDao(pool);
let poligonosController = new PoligonosController(poligonosDao);
let estaticoController = new EstaticoController();
let autorController = new AutorController();
let authController = new AuthController(usuariosDao);
let usuariosController = new UsuariosController(usuariosDao);

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
        poligonosController.alterar(req, res);
    }
    
    else if (url == 'poligonos' && metodo == 'DELETE') {
        poligonosController.apagar(req, res);
        }

    else if (url == 'usuarios' && metodo == 'GET') {
        usuariosController.listar(req, res);
    }
    else if (url == 'usuarios' && metodo == 'POST') {
        usuariosController.inserir(req, res);
    }
    else if (url == 'usuarios' && metodo == 'PUT') {
        authController.autorizar(req, res, function() {
            usuariosController.alterar(req, res);
        }, ['admin', 'geral']);
    }
    else if (url == 'usuarios' && metodo == 'DELETE') {
        authController.autorizar(req, res, function() {
            usuariosController.apagar(req, res);
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
        estaticoController.procurar(req, res);   
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});