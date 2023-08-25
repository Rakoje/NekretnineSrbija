import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Agencija = new Schema({
    naziv: {
        type: String
    },
    adresa: {
        type: String
    },
    grad: {
        type: String
    },
    telefon: {
        type: String
    },
    PIB: {
        type: Number
    }
})

export default mongoose.model('Agencija', Agencija, 'agencije');