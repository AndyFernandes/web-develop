const mongoose = require('mongoose');
const Campi = mongoose.model('Campi');
const Aluno = mongoose.model('Aluno');


module.exports = {
    async index(req, res) {
        const campis = await Campi.find({});
        return res.json(campis);
    },

    async show(req, res) {
        const campi = await Campi.findById(req.params.id);
        if(campi != null) return res.json(campi);
        else res.status(404).send('Campi não encontrado!');
    },

    async store(req, res) {
        var campi = req.body;
        var existe = await Campi.find({"codigo": campi.codigo});

        if(existe.length > 0) res.status(400).send('Esse código já está sendo utilizada!');
        else if (existe.length == 0){
            if(campi.cursos.length >= 1){
                campi = await Campi.create(campi);
                return res.json(campi);
            } else {
                res.status(400).send('Quantidade de cursos por campi deve ser maior igual a 1...');
            }
        }
        res.status(500).send('Aconteceu alguma coisa errada no servidor...');
    },

    async update(req, res) {
        var campi = null;

        if(req.body.cursos.length >= 1)
            campi = await Campi.findByIdAndUpdate(req.params.id,  req.body, { new: true });

        if(campi != null) return res.json(campi); 
        else if (campi == null) res.status(404).send('Campi não encontrado!');
        res.status(500).send('Aconteceu alguma coisa errada no servidor...');
    },

    async destroy(req, res) {    
        var campi = null;
        campi = await Campi.findByIdAndRemove(req.params.id);
        // TODO: tratamento para retirar todos os alunos que pertencem a esse campi
        console.log(campi);
        // alunos = await Aluno.find({campus})

        if(campi != null){
            return res.json(campi);
        } else if (campi == null) return res.status(404).send('Código não encontrado!');
        return res.status(500).send('Aconteceu alguma coisa errada no servidor...');
    },
};
