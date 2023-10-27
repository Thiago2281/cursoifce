const Usuario = require('./../lib/projeto/Usuarios/usuario');
const utils = require('../lib/utils');

class UsuariosController {
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
            let usuario = new Usuario();
            usuario.nome = query.nome;
            usuario.lado = parseFloat(query.lado_decagono);
                       
            utils.renderizarEjs(res, './views/area.ejs', usuario);
        })
    }
}

module.exports = UsuariosController;