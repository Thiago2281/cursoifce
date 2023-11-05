const http = require('http');
const PoligonosController = require('./controllers/PoligonosControllers');
const EstaticoController = require('./controllers/EstaticoController');
const AutorController = require('./controllers/AutorController');

let poligonosController = new PoligonosController();
let estaticoController = new EstaticoController();
let autorController = new AutorController();


const PORT = 3000;
const server = http.createServer((req, res) => {
    let [url, querystring] = req.url.split('?');
    let metodo = req.method;

    if (url=='/index') {
        poligonosController.index(req, res);
    }
    else if (url=='/area') {
        poligonosController.area(req, res);
    }
    else if (url=='/autor') {
        autorController.autor(req, res);    
    }
    else {
        estaticoController.naoEncontrado(req, res);   
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});