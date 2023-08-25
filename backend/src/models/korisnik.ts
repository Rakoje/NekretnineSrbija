import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    kor_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    grad: {
        type: String
    },
    datum_rodjenja: {
        type: String
    },
    telefon: {
        type: String
    },
    mejl:{
        type: String
    },
    tip: {
        type: Number
    },
    agencija: {
        type: String
    },
    br_licence: {
        type: String
    },
    odobren: {
        type: Number
    },
})

export default mongoose.model('Korisnik', Korisnik, 'korisnici');