var campi_cursos = [];

module.exports = {
    async index(req, res) {
        return res.json(Object.keys(campi_cursos));
    },

    async store(req, res) {
        var campi = req.body;
        //TODO: Ver como é a estrutura desse campi_cursos se é um json com a chave campo e valor array de cursos
        // campi_cursos.push(aluno);
        // retugit srn res.json(aluno);
    },

    async show(req, res) {
        // var campi;
        // campi_cursos.forEach(aluno_ => {
        //     if(aluno_.matricula == req.params.codigo)
        //         aluno = aluno_;
        // });
        // return res.json(aluno);
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