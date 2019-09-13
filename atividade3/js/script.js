// vetor pra armazenar objeto aluno {'matricula', 'nome, 'ddd', 'telefone', 'operadora', 'campus', 'curso'}

// click pro ? que será about

// campos obrigatórios do forms

// limpar dados do forms

// tabelas atualizam quando insere um novo aluno -> tabela ordenada

// botão pra remoção de aluno na tabela

// não é permitido inclusão de aluno com mesma matrícula

// paginação na tabela de usuários

// armazenar campus e curso

// validação de matricula (6 num)

// validação de ddd e telefone

// validação email + nome + data nasc

// permitir alteração das info de alunos ->  

alunos = []

campi_cursos = {
    'Porangabussu': ['Medicina', 'Odontologia', 'Farmácia'],
    'Pici': ['Computação', 'Matemática', 'Geologia'],
    'Benfica': ['Letras', 'Filosofia', 'Direito']
}

$('#remove').modal('hide');

var selectCampus = document.getElementById('campus');

function validar_matricula(matricula) {}

function validar_ddd(ddd) {}

function validar_telefone(telefone) {}

function validar_email(email) {}

function validar_nome(nome) {}

function validar_data_nasc(data_nasc) {}

function changeSelect(evento) {
    console.log(evento.value);
}

function ordenar_alunos(){

}

function atualizar_valores_tabela(){

}

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

    validar_matricula(matricula);
    validar_nome(nome);
    validar_data_nasc(data_nasc);
    validar_email(email);
    validar_ddd(ddd);
    validar_telefone(telefone);

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

function remover(evento){
    $('#remove').modal('show');


}

function atualizar(evento){}

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