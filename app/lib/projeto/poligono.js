class Poligono {
    constructor(nome, lado, senha, papel) {
        this.nome = nome;
        this.lado = lado;
        this.senha = senha;
        this.papel = papel;
    }
    area(){
        const pi = Math.PI;
        const area = (5/4) * Math.pow(this.lado,2) * (1/Math.tan(pi/10));
        return area.toFixed(2);
    }
}
module.exports = Poligono