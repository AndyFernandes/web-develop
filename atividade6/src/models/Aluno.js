const mongoose = require('mongoose');
var Schema = mongoose.Schema;
// const mongoosePaginate = require('mongoose-paginate');
const AlunoSchema = new mongoose.Schema({
    matricula: {
        type: String,
        required: true,
        unique: true
    },
    nome: {
        type: String,
        required: true,
    },
    data_nasc: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    ddd: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    operadora: {
        type: String,
        required: true,
    },
    campus: {
        type: Schema.Types.ObjectId, 
        ref: 'Campi'
    },
    curso: {
        type: String,
        required: true,
    },
});

// CampiSchema.plugin(mongoosePaginate);
mongoose.model('Aluno', AlunoSchema);