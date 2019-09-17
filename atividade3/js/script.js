// click pro ? que será about
// botão pra remoção de aluno na tabela
// botão para alterar aluno na tabela
// paginação na tabela de usuários
// modais pra tratamento de eventos
var tbody = document.querySelector('tbody');
alunos = [];
var mood_inserir = true; // true: inserir false: alterar
var num_pages = 1;
var page_atual = 1;
const MAX_LENGTH_MATRICULA = 6;
const MAX_LENGTH_DDD = 2;
const MIN_LENGTH_NOME = 3;

campi_cursos = {
    'Porangabussu': ['Medicina', 'Odontologia', 'Farmácia'],
    'Pici': ['Computação', 'Matemática', 'Geologia'],
    'Benfica': ['Letras', 'Filosofia', 'Direito']
};

/////////////////////////// OPERAÇÕES  ///////////////////////////
function ordenar_alunos(aluno) {
    function compare(a, b) {
        let comparison = 0;
        if (a.matricula > b.matricula) {
            comparison = 1;
        } else if (a.matricula < b.matricula) {
            comparison = -1;
        }
        return comparison;
    }
    alunos.sort(compare);
};

function gerar_linha(aluno) {
    var botao_remover = document.createElement('button');
    botao_remover.className = 'btn btn-danger ' + aluno['matricula'];
    botao_remover.setAttribute('onclick', 'remover(this)');
    botao_remover.textContent = "Remover";

    var botao_alterar = document.createElement('button');
    botao_alterar.className = 'btn btn-info alterar ' + aluno['matricula'];
    botao_alterar.setAttribute('onclick', 'alterar(this)');
    botao_alterar.textContent = "Alterar";

    var div = document.createElement('div');
    div.className = "row";

    div.appendChild(botao_remover);
    div.appendChild(botao_alterar);

    var tr = document.createElement('tr');
    var th_matricula = document.createElement('th');
    var th_nome = document.createElement('th');
    var th_botao = document.createElement('th');

    var matricula = document.createTextNode(aluno['matricula']);
    var nome = document.createTextNode(aluno['nome']);

    th_matricula.appendChild(matricula);
    th_nome.appendChild(nome);
    th_botao.appendChild(div);

    tr.appendChild(th_matricula);
    tr.appendChild(th_nome);
    tr.appendChild(th_botao);
    return tr;
};

function atualizar_valores_tabela() {
    var childs = tbody.querySelectorAll('tr');
    childs.forEach(child => {
        child.remove();
    });
    
    alunos.forEach(aluno => tbody.appendChild(gerar_linha(aluno)));
    // var inicio = (page_atual - 1) * 10;
    // var fim = inicio + 10;
    // for(var i = inicio; i < fim; i++){
    //     tbody.appendChild(gerar_linha(alunos[i]));
    // }
};

/////////////////////////// LISTENS ///////////////////////////
// function next() { // proxima página
//     if(page_atual == num_pages) return; 
//     page_atual += 1;
//     atualizar_valores_tabela();
// } 

// function back() { // voltar pagina
//     if(page_atual == 1) return;
//     page_atual -= 1;
//     atualizar_valores_tabela();
// } 

function autor() {
    $("#autor").modal('show');
}

function changeSelect(evento) {
    var select = document.getElementById('curso').querySelectorAll('option');
    var curso = evento.value;

    select.forEach((element, index) => {
        element.value = campi_cursos[curso][index];
        element.innerText = campi_cursos[curso][index];
    });
}

function limpar() {
    document.getElementById('matricula').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('data_nasc').value = '';
    document.getElementById('email').value = '';
    document.getElementById('ddd').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('operadoras').value = '';
    document.getElementById('campus').value = '';
    document.getElementById('curso').value = '';

    if(mood_inserir == false){
        document.getElementById('submit_form').textContent = "Inserir";
        document.getElementById('submit_form').setAttribute('onclick', 'inserir()');
        document.getElementById('matricula').readOnly = false;
    }
}

/////////////////////////// VALIDAÇÕES ///////////////////////////
function verificacao_duplicidade_matricula(matricula) {
    var retorno = "valido";
    alunos.forEach(aluno => {
        if (aluno.matricula === matricula) {
            retorno = "invalido";
        }
    });
    return retorno;
};

// function validar_matricula(matricula) {
//     if (matricula.length === MAX_LENGTH_MATRICULA && !isNaN(matricula)) return false;
//     return true;
// };

// function validar_ddd(ddd) {
//     if (ddd.length === MAX_LENGTH_DDD && !isNaN(ddd)) return false;
//     return true;
// };

// function validar_telefone(telefone) {
//     if ((telefone.length == 8 || telefone.length == 9) && !isNaN(telefone)) return false;
//     return true;
// };

// function validar_nome(nome) {
//     if (nome.length >= MIN_LENGTH_NOME) return false;
//     return true;
// };

/////////////////////////// CRUD ALUNO ///////////////////////////
function inserir() {
    mood_inserir = true;
    var matricula = document.getElementById('matricula').value;
    var nome = document.getElementById('nome').value;
    var data_nasc = document.getElementById('data_nasc').value;
    var email = document.getElementById('email').value;
    var ddd = document.getElementById('ddd').value;
    var telefone = document.getElementById('telefone').value;
    var operadora = document.getElementById('operadoras').value;
    var campus = document.getElementById('campus').value;
    var curso = document.getElementById('curso').value;

    // if (validar_matricula(matricula) ||
    //     validar_nome(nome) ||
    //     validar_ddd(ddd) ||
    //     validar_telefone(telefone)) {
    //     return;
    // } 
    if (verificacao_duplicidade_matricula(matricula) == "invalido") {
        $("#matricula_repetida").modal('show');
    } else {
        alunos.push({
            'matricula': matricula,
            'nome': nome,
            'data_nasc': data_nasc,
            'email': email,
            'ddd': ddd,
            'telefone': telefone,
            'operadora': operadora,
            'campus': campus,
            'curso': curso
        });

        limpar();
        ordenar_alunos();
        atualizar_valores_tabela();
        alert("Matricula realizada com sucesso!");
        // num_pages = Math.ceil(alunos.length / 10);
    }
};

function get_index_aluno_by_matricula(matricula) {
    alunos.forEach((aluno, index) => {
        if (aluno.matricula == matricula) {
            return index;
        }
    });
}

function confirmar_remocao(matricula) {
    $("#remove").modal('hide');
    var index = get_index_aluno_by_matricula(matricula);
    alunos.splice(index, 1);
    // num_pages = Math.ceil(alunos.length / 10);
    atualizar_valores_tabela();
};

function remover(evento) {
    $('#remove').modal('show');
    var matricula = evento.className.split(" ")[2];
    document.getElementById('confirmar').setAttribute('onclick', 'confirmar_remocao(' + matricula + ')');
};

function confirmar_alteracao(index) {
    alunos[index].matricula = document.getElementById('matricula').value;
    alunos[index].nome = document.getElementById('nome').value;
    alunos[index].data_nasc = document.getElementById('data_nasc').value;
    alunos[index].email = document.getElementById('email').value;
    alunos[index].ddd = document.getElementById('ddd').value;
    alunos[index].telefone = document.getElementById('telefone').value;
    alunos[index].operadoras = document.getElementById('operadoras').value;
    alunos[index].campus = document.getElementById('campus').value;
    alunos[index].curso = document.getElementById('curso').value;

    alert("Alteração realizada com sucesso!");
    atualizar_valores_tabela();
    limpar();
}

function alterar(evento) {
    mood_inserir = false;
    var matricula = evento.className.split(" ")[3];
    var index;
    alunos.forEach((aluno, i) => {
        if (aluno.matricula == matricula) {
            index = i;
        }
    });

    document.getElementById('matricula').value = matricula;
    document.getElementById('matricula').readOnly = true;
    document.getElementById('nome').value = alunos[index].nome;
    document.getElementById('data_nasc').value = alunos[index].data_nasc;
    document.getElementById('email').value = alunos[index].email;
    document.getElementById('ddd').value = alunos[index].ddd;
    document.getElementById('telefone').value = alunos[index].telefone;
    document.getElementById('operadoras').value = alunos[index].operadora;
    document.getElementById('campus').value = alunos[index].campus;
    document.getElementById('curso').value = alunos[index].curso;

    document.getElementById('submit_form').textContent = "Confirmar alterações";
    document.getElementById('submit_form').setAttribute('onclick', 'confirmar_alteracao(' + index + ')');
};