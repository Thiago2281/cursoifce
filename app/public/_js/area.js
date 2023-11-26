function calcularArea() {

    let inputNome = document.querySelector('[name=nome]');
    let nome = inputNome.value;
    let inputLado = document.querySelector('[name=lado]');
    let lado = parseFloat(inputLado.value);
    
    /*
    const pi = Math.PI;
    let area = (5/4) * Math.pow(lado,2) * (1/Math.tan(pi/10));
    
    let area_e_media = (area>=10 && area<=20);

    let divResposta = document.querySelector('#resposta');
    let div = document.createElement('div');
    div.textContent = 'Olá, ' + nome + '! Seu decágono tem ' + lado + ' . metros de lado. A  área dele é ' + area + ' metros quadrados.';

    if (area_e_media) {
        div.classList.add('padrao');
        div.classList.remove('npadrao');
    }
    else {
        div.classList.remove('padrao');
        div.classList.add('npadrao');
    }

    divResposta.append(div);*/

    inserir({
        nome, lado
    });
    listar();

}

let traducoes = {
    'pt-BR': {
        'mensagem_senha_em_branco': 'A senha não pode ser em branco!',
        'mensagem_poligono_cadastrado': 'Poligono cadastrado com sucesso!',
        'mensagem_poligono_apagado': 'Poligono apagado com sucesso!'
    },
    'en': {
        'mensagem_senha_em_branco': 'Password cannot be empty!'
    }
}

async function inserir(poligono) {
    console.log('inserindo', poligono);
    let divResposta = document.querySelector('#resposta');
    let dados = new URLSearchParams(poligono);
    console.log(dados);
    let resposta = await fetch('poligonos', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },   
        body: dados
    });
    if (resposta.status == 200) {
        divResposta.classList.add('padrao');
        divResposta.classList.remove('npadrao');
    }
    else {
        divResposta.classList.add('npadrao');
        divResposta.classList.remove('padrao');
    }
    let respostaJson = await resposta.json();
    let mensagem = respostaJson.mensagem;
    divResposta.innerText = traducoes['pt-BR'][mensagem];
}

async function listar() {
    let divPoligonos = document.querySelector('#poligonos');
    divPoligonos.innerText = 'Carregando...'
    let resposta = await fetch('poligonos');
    let poligonos = await resposta.json();
    divPoligonos.innerHTML = '';
    for (let poligono of poligonos) {
        let linha = document.createElement('tr');
        let colunaId = document.createElement('td');
        let colunaNome = document.createElement('td');
        let colunalado = document.createElement('td');
        let colunaAcoes = document.createElement('td');
        let botaoEditar = document.createElement('button');
        let botaoApagar = document.createElement('button');
        colunaId.innerText = poligono.id;
        colunaNome.innerText = poligono.nome;
        colunalado.innerText = poligono.lado;
        botaoEditar.innerText = 'Editar';
        botaoEditar.onclick = function () {
            editar(poligono.id);
        }
        botaoApagar.onclick = function () {
            apagar(poligono.id);
        }
        botaoApagar.innerText = 'Apagar';
        linha.appendChild(colunaId);
        linha.appendChild(colunaNome);
        linha.appendChild(colunalado);
        colunaAcoes.appendChild(botaoEditar);
        colunaAcoes.appendChild(botaoApagar);
        linha.appendChild(colunaAcoes);
        divPoligonos.appendChild(linha);
    }
}

async function editar(id) {
    alert('editar' + id);
}

async function apagar(id) {
    let divResposta = document.querySelector('#resposta');
    if (confirm('Quer apagar o #' + id + '?')) {
        let resposta = await fetch('poligonos/' + id, {
            method: 'delete',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        });
        let respostaJson = await resposta.json();
        let mensagem = respostaJson.mensagem;
        divResposta.innerText = traducoes['pt-BR'][mensagem];
        listar();
    }
}

