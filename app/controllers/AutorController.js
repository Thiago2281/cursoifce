class AutorController{
    autor(req, res) {
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
        res.end()
    }
}
module.exports = AutorController;