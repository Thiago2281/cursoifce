const Usuario = require('./../lib/projeto/Usuarios/usuario');
const utils = require('../lib/utils');
class UsuariosController {
    index(req, res) {
        utils.renderizarEjs(res, './views/index.ejs');      
    }
    area(req, res){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`<!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>`)
        res.write('<h1>Área de uma forma de decágono</h1>');
        res.write('<p>Se a área estiver dentro do intervalo de 10 a 20 metros quadrados, é uma área média. Caso contrário, é uma área que não segue o padrão</p>');
        res.write('<p>Podemos calcular a área do decágono em função da medida dos lados.</p>');
        res.write('<p>Área = (5/4)*lado^2*(1/tan(PI/10))</p>');
        
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
            
            let lado = usuario.lado;
            let nome = usuario.nome;
            let areaDecagono = usuario.area();

            res.write(`<h2>Olá, ${nome}! Seu decágono tem ${lado} metros de lado. A  área dele é ${areaDecagono} metros quadrados</h2>`)
            if (areaDecagono >= 10 && areaDecagono <=20){
                res.write('<p>A área é média')
            }
            else {
                res.write('<p>A área não segue o padrão')
            }
            res.write('</body>')
            res.end();
        })
    }
}

module.exports = UsuariosController;