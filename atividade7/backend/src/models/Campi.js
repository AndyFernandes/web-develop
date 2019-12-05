const mongoose = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate');
const CampiSchema = new mongoose.Schema({
    codigo: {
        type: Number,
        required: true,
        unique: true
    },
    campi: {
        type: String,
        required: true,
    },
    cursos: [{
        type: String,
        required: true,
    }],
});

// CampiSchema.plugin(mongoosePaginate);
mongoose.model('Campi', CampiSchema);