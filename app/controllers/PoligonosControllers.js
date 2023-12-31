const Poligono = require('./../lib/projeto/poligono');
const utils = require('../lib/utils');

class PoligonosController {
    constructor(poligonosDao) {
        this.poligonosDao = poligonosDao;
    }
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
            poligono.lado = parseFloat(query.lado);
                       
            utils.renderizarEjs(res, './views/area.ejs', poligono);
        })
    }

    listar(req, res) {
        let poligonos = this.poligonosDao.listar();

        let dados = poligonos.map(poligono => {
            return {
                ...poligono,
                area: poligono.area(),
            };
        })

        utils.renderizarJSON(res, dados);
    }
    
    async inserir(req, res) {
        let poligono = await this.getPoligonoDaRequisicao(req);
        try {
            this.poligonosDao.inserir(poligono);
            utils.renderizarJSON(res, {
                poligono: {
                    ...poligono,
                    area: poligono.area(),
                },
                mensagem: 'mensagem_poligono_cadastrado'
            });
        } catch (e) {
            utils.renderizarJSON(res, {
                mensagem: e.message
            }, 400);
        }
    }

    async alterar(req, res) {
        let poligono = await this.getPoligonoDaRequisicao(req);
        let [ url, queryString ] = req.url.split('?');
        let urlList = url.split('/');
        url = urlList[1];
        let id = urlList[2];
        try {
            this.poligonosDao.alterar(id, poligono);
            utils.renderizarJSON(res, {
                mensagem: 'mensagem_poligono_alterado'
            });
        } catch (e) {
            utils.renderizarJSON(res, {
                mensagem: e.message
            }, 400);
        }
    }
    
    apagar(req, res) {
        let [ url, queryString ] = req.url.split('?');
        let urlList = url.split('/');
        url = urlList[1];
        let id = urlList[2];
        this.poligonosDao.apagar(id);
        utils.renderizarJSON(res, {
            mensagem: 'mensagem_poligono_apagado',
            id: id
        });
    }

    async getPoligonoDaRequisicao(req) {
        let corpo = await utils.getCorpo(req);
        let poligono = new Poligono(
            corpo.nome,
            parseFloat(corpo.lado),
            corpo.senha,
            corpo.papel
        );
        return poligono;
    }
}

module.exports = PoligonosController;