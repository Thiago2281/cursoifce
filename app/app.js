const http = require('http');

const PORT = 3000;
const server = http.createServer((req, res) => {
    let [url, querystring] = req.url.split('?');
    let metodo = req.method;

if (url=='/index') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>`)
    res.write('<h1>Vamos calcular a área de um decágono regular!</h1>');
    res.write('<p>Determine a área de uma forma de decágono. Se a área estiver dentro do intervalo de 10 a 20 metros quadrados, é uma área média. Caso contrário, é uma área que não segue o padrão</p>');
    res.write('<h2>Digite abaixo os dados:</h2>');
    res.write('<form action="area" method="post">');
    res.write('<label>');
    res.write('<span>Nome</span>');
    res.write('<input name="nome">');
    res.write('</label>');
    res.write('<label>')
    res.write('<span>Lado do decágono (em metros)</span>');
    res.write('<input name="lado_decagono">');
    res.write('</label>');
    res.write('<label>');
    res.write('<button>OK</button>');
    res.write('</label>');
    res.write('</form>');
    res.write('</body>');
}

else if (url=='/area') {
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
        let nome = query.nome;
        let lado = parseFloat(query.lado_decagono);
        function calcularArea(lado) {
            const pi = Math.PI;
            const area = (5/4) * Math.pow(lado,2) * (1/Math.tan(pi/10));
            return area.toFixed(2);
        }
        const areaDecagono = calcularArea(lado);
        res.write(`<h2>Olá, ${nome}! Seu decágono tem ${lado} metros de lado. A  área dele é ${areaDecagono} metros quadrados</h2>`)
        if (areaDecagono >= 10 && areaDecagono <=20){
            res.write('<p>A área é média')
            res.write('</body>')
        }
        else {
            res.write('<p>A área não segue o padrão')
            res.write('</body>')
        }
        res.end();
    })
}
else if (url=='/autor') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>`)
    res.write('<h1>Autor</h1>');
    res.write('<h2>Nome: Thiago Cadore Vale</h2>');
    res.write('<h2>Formação acadêmica: Academia Militar das Agulhas Negras</h2>');
    res.write('<h2>Experiências profissionais: Capitão do Exército Brasileiro</h2>'); 
    res.write('</body>')
}
else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write(`<!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>`)
    res.write('<h1>Não encontrado!</h1>');
    res.write('</body>')
    res.end();    
} 
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});