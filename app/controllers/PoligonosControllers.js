const Poligono = require('./../lib/projeto/Poligonos/poligono');
const utils = require('../lib/utils');

class PoligonosController {
    index(req, res) {
        utils.renderizarEjs(res, './views/index.ejs');      
    }
    area(req, res){               
        let corpoTexto ='';
        req.on('data', function (pedaco) {
            corpoTexto += pedaco;
        });
        req.on('end', () => {
            let propriedades = corpoTexto.split('&');
            let query = {};
            for (let propriedade of propriedades) {
                let [variavel, valor] = propriedade.split('=');
                query[variavel] = valor;
            }
            let poligono = new Poligono();
            poligono.nome = query.nome;
            poligono.lado = parseFloat(query.lado_decagono);
                       
            utils.renderizarEjs(res, './views/area.ejs', poligono);
        })
    }
}

module.exports = PoligonosController;