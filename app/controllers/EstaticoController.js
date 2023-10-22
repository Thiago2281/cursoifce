class EstaticoController {
    naoEncontrado(req, res){
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
}

module.exports = EstaticoController;