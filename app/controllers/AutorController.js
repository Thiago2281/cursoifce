const utils = require("../lib/utils")

class AutorController {
    autor(req, res) {
        let autor = {
            nome: 'Thiago',
            formacoes: [
                'Ciências Militares'
            ]
        }

        utils.renderizarEjs(res, './views/autor.ejs', autor);
    }
}
module.exports = AutorController;