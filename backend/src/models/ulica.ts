import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Ulica = new Schema({
    naziv: {
        type: String
    },
    mikrolokacija:{
        type: String
    }
})

export default mongoose.model('Ulica', Ulica, 'ulice');