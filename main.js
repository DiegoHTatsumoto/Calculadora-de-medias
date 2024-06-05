// Seleciona o formulário de atividade pela classe CSS
const form = document.querySelector('.form-atividade');

// Define as strings das imagens de aprovado e reprovado
const imgAprovado = '<img src="./images/aprovado.png" alt="aprovado" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="reprovado" />';

// Arrays para armazenar atividades e notas
const atividades = [];
const notas = [];

// Strings HTML para resultado de aprovação/reprovação
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';

// Nota mínima definida pelo usuário
const notaMinima = parseFloat(prompt("Digite a nota mínima:"));

// String HTML para linhas da tabela
let linhas = '';

// Adiciona um ouvinte de evento de envio ao formulário
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o comportamento padrão do envio do formulário

    // Adiciona uma nova linha à tabela
    adicionaLinha();

    // Atualiza a tabela
    atualizandoTabela();

    // Atualiza a média final
    atualizaMediaFinal();
});

// Função para adicionar uma nova linha à tabela
function adicionaLinha() {
    // Seleciona os campos de entrada de nome e nota da atividade
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    // Verifica se a atividade já foi inserida anteriormente
    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade "${inputNomeAtividade.value}" já foi inserida.`);
    } else {
        // Adiciona a atividade e a nota aos arrays correspondentes
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        // Constrói a linha da tabela com os valores dos campos de entrada
        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`; 
        linha += `<td>${inputNotaAtividade.value}</td>`; 
        linha += `<td>${inputNotaAtividade.value >= 7 ? imgAprovado : imgReprovado}</td>`; 
        linha += '</tr>';

        // Adiciona a linha à variável linhas
        linhas += linha;

        // Limpa os campos de entrada após a inserção
        inputNomeAtividade.value = ''; 
        inputNotaAtividade.value = ''; 
    }
}

// Função para atualizar a tabela com as linhas inseridas
function atualizandoTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

// Função para calcular a média final das notas
function atualizaMediaFinal() {
    // Calcula a média das notas
    const mediaFinal = calculaMediaFinal();

    // Exibe a média final na tabela com a devida classificação (aprovado/reprovado)
    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

// Função para calcular a média final das notas
function calculaMediaFinal() {
    let somaDasNotas = 0;

    // Soma todas as notas armazenadas no array
    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    // Calcula a média dividindo a soma total pelo número de notas
    return somaDasNotas / notas.length;
}
