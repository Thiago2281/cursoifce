const Poligono = require("./poligono")
const bcrypt = require('bcrypt')

class PoligonosMysqlDao {
    constructor(pool) {
        this.pool = pool;
    }
    listar() {
        return new Promise((resolve, reject) => {
            this.pool.query('SELECT * FROM poligonos;', function (error, linhas, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                let poligonos = linhas.map(linha => {
                    let { id, nome, lado } = linha;
                    return new Poligono(nome, lado, id);
                })
                resolve(poligonos);
            });
        });
    }

    inserir(poligono) {
        this.validar(poligono);

        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO poligonos (nome, lado) VALUES (?, ?);';
            console.log({sql}, poligono);
            this.pool.query(sql, [poligono.nome, poligono.lado], function (error, resultado, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado.insertId);
            });
        });
    }

    alterar(id, poligono) {
        this.validar(poligono);
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE poligonos SET nome=?, lado=? WHERE id=?;';
            this.pool.query(sql, [poligono.nome, poligono.lado, id], function (error, resultado, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado.alterId);
            });
        });
    }
    

    apagar(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM poligonos WHERE id=?;';
            this.pool.query(sql, id, function (error, resultado, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado.deleteId);
            });
        });
    }

    validar(poligono) {
        if (poligono.nome == '') {
            throw new Error('mensagem_nome_em_branco');
        }
        if (poligono.lado < 0) {
            throw new Error('mensagem_tamanho_invalido');
        }
    }
    /*
    autenticar(nome, senha) {
        for (let poligono of this.listar()) {
            if (poligono.nome == nome && bcrypt.compareSync(senha, poligono.senha)) {
                return poligono;
            }
        }
        return null;
    }*/

}

module.exports = PoligonosMysqlDao;