const Poligono = require("./poligono")
const bcrypt = require('bcrypt')

class PoligonosDao {
    constructor() {
        this.poligonos = [];
    }
    listar() {
        return this.poligonos;
    }

    inserir(poligono) {
        this.validar(poligono);
        poligono.senha = bcrypt.hashSync(poligono.senha, 10);
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
        if (!poligono.senha) {
            throw new Error('mensagem_senha_em_branco');
        }
        if (poligono.lado < 0) {
            throw new Error('mensagem_tamanho_invalido');
        }
    }
    autenticar(nome, senha) {
        for (let poligono of this.listar()) {
            if (poligono.nome == nome && bcrypt.compareSync(senha, poligono.senha)) {
                return poligono;
            }
        }
        return null;
    }

}

module.exports = PoligonosDao;