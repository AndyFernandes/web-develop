var alunos = [];
// considerando que 1 aluno é {"nome":"", "matricula": ""}

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
        
        alunos.forEach(aluno_ => {
            if(aluno_.matricula == aluno.matricula)
                existe = true;
        });

        if(existe) res.status(400).send('Essa matrícula já está sendo utilizada!');
        else if (existe == false){
            alunos.push(aluno);
            return res.json(aluno);
        }
        res.status(500).send('Aconteceu alguma coisa errada no servidor...');
    },

   
    async update(req, res) {
        var aluno = req.body;
        var existe = false;
        alunos.forEach((aluno_, i) => {
            if(aluno_.matricula == req.params.matricula){
                alunos[i].nome = aluno.nome;
                aluno = alunos[i];
                existe = true;
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