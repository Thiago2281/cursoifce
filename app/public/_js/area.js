function calcularArea() {

    let inputNome = document.querySelector('[name=nome]');
    let nome = inputNome.value;
    let inputLado = document.querySelector('[name=lado]');
    let lado = parseFloat(inputLado.value);
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

    divResposta.append(div);
}
