var alunos = [];

module.exports = {
    async index(req, res) {
        return res.json(alunos);
    },

    async store(req, res) {
        var aluno = req.body;
        //TODO: Fazer verificação se matrícula não é repetida
        alunos.push(aluno);
        return res.json(aluno);
    },

    async show(req, res) {
        var aluno;
        alunos.forEach(aluno_ => {
            if(aluno_.matricula == req.params.matricula)
                aluno = aluno_;
        });
        return res.json(aluno);
    },

    async update(req, res) {
        var aluno = req.body;
        alunos.forEach(aluno_ => {
            if(aluno_.matricula == req.params.matricula)
                aluno_ = aluno;
                //TODO: ver se não precisa fazer uma atribuição parâmetro por parâmetro
        });
        return res.json(aluno);
    },

    async destroy(req, res) {
        var index;
        alunos.forEach((aluno_, i) => {
            if(aluno_.matricula == req.params.matricula)
                aluno_ = aluno;
                index = i
        });
        alunos.splice(index, 1);
        return res.send();
    },
};