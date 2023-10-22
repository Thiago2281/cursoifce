const fs = require('fs');
const utils ={
    renderizarEjs: function (res, arquivo) {
        let texto = fs.readFileSync(arquivo, 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(texto);
        res.end();
    }
}
module.exports = utils;