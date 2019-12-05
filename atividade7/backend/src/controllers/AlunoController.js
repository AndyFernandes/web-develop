const mongoose = require('mongoose');
const Aluno = mongoose.model('Aluno');
const Campi = mongoose.model('Campi');

module.exports = {
    async index(req, res) {
        var alunos_ = await Aluno.find({});
        if(req.query.campus){
            alunos_ = alunos_.filter(aluno => (aluno.campus == req.query.campus));
            console.log(alunos_);
        }

        if(req.query.curso){
            alunos_ = alunos_.filter(aluno => (aluno.curso == req.query.curso));
        }

        if(req.query.min_data && req.query.max_data){
            alunos_ = alunos_.filter(aluno => (aluno.data_nasc >= req.query.min_data && aluno.data_nasc <= req.query.max_data));
        }
        return res.json(alunos_);
    },

    async show(req, res) {
        
        try {
            const aluno = await Aluno.findById(req.params.id);
            if(aluno != null) return res.json(aluno);
            else res.status(404).send('Aluno não encontrado!');
        } catch (e){
            res.status(404).send("Código inválido!");
        }
    },

    async store(req, res) {
        var aluno = req.body;
        var existe_curso = false;

        try {
            // var campi = 
            // console.log(aluno.campus);
            var campi = await Campi.find({"campi": aluno.campus});
            campi = campi[0];

            // console.log(campi);
            // console.log(campi.cursos);
            // console.log(campi._id);
            // console.log(campi[0]._id);
            if (campi == null) res.status(400).send("Campus não cadastrado");
            campi.cursos.forEach(curso => {
                if(curso == aluno.curso) existe_curso = true;
            });
            if (existe_curso == false) res.status(400).send("Curso não pertence ao Campus informado...");
            else{
                // console.log(campi);
                aluno['campus'] = campi['_id'];

                aluno = await Aluno.create(aluno);
                res.json(aluno);
            }
        } catch(e){
            res.status(400).send(e.message);
        }
        res.status(500).send('Aconteceu alguma coisa errada no servidor...');
    },
    async update(req, res) {
        var aluno = req.body;
        var existe_curso = false;

        try {
            var campi = await Campi.findById(aluno.campus);
            if (campi == null) res.status(400).send("Campus não cadastrado");
            campi.cursos.forEach(curso => {
                if(curso == aluno.curso) existe_curso = true;
            });
            if (existe_curso == false) res.status(400).send("Curso não pertence ao Campus informado...");
            else{
                aluno = await Aluno.findByIdAndUpdate(req.params.id,  aluno, { new: true });
                res.json(aluno);
            }
        } catch(e){
            res.status(400).send(e.message);
        }
        res.status(500).send('Aconteceu alguma coisa errada no servidor...');
    },

    async destroy(req, res) {
        var aluno = null;
        aluno = await Aluno.findByIdAndRemove(req.params.id);

        if(aluno != null){
            return res.json(aluno);
        } else if (aluno == null) return res.status(404).send('Aluno não encontrado!');
        return res.status(500).send('Aconteceu alguma coisa errada no servidor...');
    },
};
