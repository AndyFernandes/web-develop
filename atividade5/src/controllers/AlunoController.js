var alunos = [];
// considerando que 1 aluno é =
// {
//     "matricula":"",
//     "nome":"",
//     "data_nasc":"",
//     "email":"",
//     "ddd":"",
//     "telefone":"",
//     "operadora":"",
//     "campus":"",
//     "curso":"",
// }

module.exports = {
    async index(req, res) {
        return res.json(alunos);
    },

    async show(req, res) {
        var aluno = null;

        alunos.forEach(aluno_ => {
            if(aluno_.matricula == req.params.matricula)
                aluno = aluno_;
        });

        if(aluno != null) return res.json(aluno);
        else res.status(404).send('Matrícula não encontrada!');
    },

    async store(req, res) {
        var aluno = req.body;
        var existe = false;
        var achou_campi = false;

        var campis = require('./CampiController').campis;
        
        alunos.forEach(aluno_ => {
            if(aluno_.matricula == aluno.matricula){
                existe = true;
            }
        });

        if(existe) res.status(400).send('Essa matrícula já está sendo utilizada!');
        else if (existe == false){
            if("nome" in aluno && "data_nasc" in aluno && "email" in aluno && "ddd" in aluno && "telefone" in aluno && "operadora" in aluno && "campus" in aluno && "curso" in aluno){
                campis.forEach(campi => {
                    if(campi.campi == aluno.campus){
                        achou_campi = true;
                        alunos.push(aluno);
                        return res.json(aluno);
                    }
                });

                if(achou_campi == false) res.status(400).send('Campus informado não está cadastrado...');
            } else res.status(400).send('Campos não estão de acordo com o esperado...');
        }
        res.status(500).send('Aconteceu alguma coisa errada no servidor...');
    },
    async update(req, res) {
        var aluno = req.body;
        var existe = false;
        var achou_campi = false;

        var campis = require('./CampiController').campis;
        alunos.forEach((aluno_, i) => {
            if(aluno_.matricula == req.params.matricula){
                if("nome" in aluno && "data_nasc" in aluno && "email" in aluno && "ddd" in aluno && "telefone" in aluno && "operadora" in aluno && "campus" in aluno && "curso" in aluno){
                    campis.forEach(campi => {
                        if(campi.campi == aluno.campus){
                            alunos[i].nome = aluno.nome;
                            alunos[i].data_nasc = aluno.data_nasc;
                            alunos[i].email = aluno.email;
                            alunos[i].ddd = aluno.ddd;
                            alunos[i].telefone = aluno.telefone;
                            alunos[i].operadora = aluno.operadora;
                            alunos[i].campus = aluno.campus;
                            alunos[i].curso = aluno.curso;

                            aluno = alunos[i];
                            existe = true;  
                            achou_campi = true; 
                        }
                    });
                    
                    if(achou_campi == false) res.status(400).send('Campus informado não está cadastrado...');
                } else res.status(400).send('Campos não estão de acordo com o esperado...');
            }
        });

        if(existe) return res.json(aluno);
        else if (existe == false) return res.status(404).send('Matrícula não encontrada!');
        return res.status(500).send('Aconteceu alguma coisa errada no servidor...');
    },

    async destroy(req, res) {
        var index = null;
        var existe = false;
        var aluno = null;

        alunos.forEach((aluno_, i) => {
            if(aluno_.matricula == req.params.matricula){
                index = i;
                existe = true;
                aluno = aluno_;
            } 
        });

        if(existe){
            alunos.splice(index, 1);
            return res.json(aluno);
        } else if (existe == false) return res.status(404).send('Matrícula não encontrada!');
        return res.status(500).send('Aconteceu alguma coisa errada no servidor...');
    },
};

module.exports.alunos = alunos;