const http = require('http');
const PoligonosController = require('./controllers/PoligonosControllers');
const EstaticoController = require('./controllers/EstaticoController');
const AutorController = require('./controllers/AutorController');
const PoligonosDao = require('./lib/projeto/PoligonosDao');

let poligonosDao = new PoligonosDao();
let poligonosController = new PoligonosController(poligonosDAO);
let estaticoController = new EstaticoController();
let autorController = new AutorController();


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

    else if (url=='autor') {
        autorController.autor(req, res);    
    }
    else {
        estaticoController.naoEncontrado(req, res);   
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});