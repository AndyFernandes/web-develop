// vetor pra armazenar objeto aluno {'matricula', 'nome, 'ddd', 'telefone', 'operadora', 'campus', 'curso'}

// click pro ? que será about

// campos obrigatórios do forms

// limpar dados do forms

// tabelas atualizam quando insere um novo aluno -> tabela ordenada

// botão pra remoção de aluno na tabela

// não é permitido inclusão de aluno com mesma matrícula

// paginação na tabela de usuários

alunos = [];
campi_cursos = {
    'Porangabussu': ['Medicina', 'Odontologia', 'Farmácia'],
    'Pici': ['Computação', 'Matemática', 'Geologia'],
    'Benfica': ['Letras', 'Filosofia', 'Direito']
};
var tbody = document.querySelector('tbody');
console.log(tbody);
$('#remove').modal('hide');


////////// OPERAÇÕES
// TODO
function ordenar_alunos() {}

function gerar_linha(aluno) {
    var botao_remover = document.createElement('button');
    botao_remover.className = 'btn btn-light ' + aluno['matricula'];
    botao_remover.id = "remover_aluno";
    botao_remover.value = 'Remover';

    var botao_alterar = document.createElement('button');
    botao_alterar.className = 'btn btn-light ' + aluno['matricula'];
    botao_alterar.value = 'Alterar';
    botao_alterar.id = "alterar_aluno";

    var tr = document.createElement('tr');
    var th_matricula = document.createElement('th');
    var th_nome = document.createElement('th');
    var th_botao = document.createElement('th');

    var matricula = document.createTextNode(aluno['matricula']);
    var nome = document.createTextNode(aluno['nome']);

    th_matricula.appendChild(matricula);
    th_nome.appendChild(nome);
    th_botao.appendChild(botao_remover);
    th_botao.appendChild(botao_alterar);

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

    alunos.forEach(aluno => {
        tbody.appendChild(gerar_linha(aluno));
    });
};

////////////////////// LISTENS
// TODO
function next() {} // proxima página 

function back() {} // voltar pagina

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
}

//////////////////////// VALIDAÇÕES
// TODO
function verificacao_duplicidade_matricula(matricula) {
    alunos.forEach(aluno => {
        if (aluno.matricula == matricula) return false;
    });
    return true;
    //mostrar modal
}

function validar_matricula(matricula) {
    if (matricula.length === 6 && !isNaN(matricula) && verificacao_duplicidade_matricula(matricula)) return true;
    return false;
}

function validar_ddd(ddd) {
    if (ddd.length === 2 && !isNaN(ddd)) return true;
    return false;
};

function validar_telefone(telefone) {
    if ((telefone.length == 8 || telefone.length == 9) && !isNaN(telefone)) return true;
    return false;
}

function validar_email(email) {}

function validar_nome(nome) {
    if (nome.length >= 2) return true;
    return false;
}

// validação data nascimento 
function validar_data_nasc(data_nasc) {}

//////////////////////// CRUD ALUNO
function inserir() {
    var matricula = document.getElementById('matricula').value;
    var nome = document.getElementById('nome').value;
    var data_nasc = document.getElementById('data_nasc').value;
    var email = document.getElementById('email').value;
    var ddd = document.getElementById('ddd').value;
    var telefone = document.getElementById('telefone').value;
    var operadora = document.getElementById('operadoras').value;
    var campus = document.getElementById('campus').value;
    var curso = document.getElementById('curso').value;

    if (validar_matricula(matricula) &&
        validar_nome(nome) &&
        validar_data_nasc(data_nasc) &&
        validar_email(email) &&
        validar_ddd(ddd) &&
        validar_telefone(telefone)) {
        return;
    }

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

    atualizar_valores_tabela();
    console.log(alunos);
}

function remover(evento) {
    $('#remove').modal('show');
}

function atualizar(evento) {}