var campis = [
    {
        "codigo": 1,
        "campi": "Pici",
        "cursos": ["Computação", "Engenharia de Computação", "SMD"]
    }
];


// considerando que 1 campi é =
// {
//     "codigo":"",
//     "campi":"",
//     "cursos": ["curso1", "curso2", "curso3"]
// }

module.exports = {
    async index(req, res) {
        return res.json(campis);
    },

    async show(req, res) {
        var campi = null;

        campis.forEach(campi_ => {
            if(campi_.codigo == req.params.codigo)
                campi = campi_;
        });

        if(campi != null) return res.json(campi);
        else res.status(404).send('Código não encontrada!');
    },

    async store(req, res) {
        var campi = req.body;
        var existe = false;
        
        campis.forEach(campi_ => {
            if(campi_.codigo == campi.codigo){
                existe = true;
            }
        });

        if(existe) res.status(400).send('Esse código já está sendo utilizada!');
        else if (existe == false){
            if(campi.cursos.length >= 1){
                campis.push(campi);
                return res.json(campi);
            }
        }
        res.status(500).send('Aconteceu alguma coisa errada no servidor...');
    },

    async update(req, res) {
        var campi = req.body;
        var existe = false;
        
        campis.forEach((campi_, i) => {
            if(campi_.codigo == req.params.codigo && campi.cursos.length >= 1){
                campis[i].campi = campi_.campi;
                campis[i].cursos = campi_.cursos;
                campi = campi_;
                existe = true;
            }
        });

        if(existe) return res.json(campi); 
        else if (existe == false) res.status(404).send('Código não encontrado!');
        res.status(500).send('Aconteceu alguma coisa errada no servidor...');
    },

    async destroy(req, res) {
        var index = null;
        var existe = false;
        var campi = null;
        var indexes = [];
        var alunos =  require('./AlunoController');

        campis.forEach((campi_, i) => {
            if(campi_.codigo == req.params.codigo){
                index = i;
                existe = true;
                campi = campi_;

                // console.log(alunos.alunos);
                alunos.alunos.forEach((aluno_, index) => {
                    if(aluno_.campus == campi_.campi){
                        indexes.push(index);
                        // alunos.alunos.splice(index, 1);
                        // console.log(aluno_)
                    }
                });
            } 
        });

        indexes.forEach(i =>{
            alunos.alunos.splice(i, 1);
        })

        if(existe){
            campis.splice(index, 1);
            return res.json(campi);
        } else if (existe == false) return res.status(404).send('Código não encontrado!');
        return res.status(500).send('Aconteceu alguma coisa errada no servidor...');
    },
};

module.exports.campis = campis;