const fs = require('fs');
const ejs = require('ejs');

const utils ={
    renderizarEjs: function (res, arquivo, dados) {
        let texto = fs.readFileSync(arquivo, 'utf-8');
        let html = ejs.render(texto, dados);

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();
    }
}
module.exports = utils;