const Poligono = require("./poligono")

class PoligonosDao {
    constructor() {
        this.poligonos = [];
    }
    listar() {
        return this.poligonos;
    }

    inserir(poligono) {
        this.validar(poligono);
        this.poligonos.push(poligono);
    }

    alterar(id, poligono) {
        this.validar(poligono);
        this.poligonos[id] = poligono;
    }

    apagar(id) {
        this.poligonos.splice(id, 1);
    }

    validar(poligono) {
        if (poligono.nome == '') {
            throw new Error('mensagem_nome_em_branco');
        }
        if (poligono.lado < 0) {
            throw new Error('mensagem_tamanho_invalido');
        }
    }
}

module.exports = PoligonosDao;