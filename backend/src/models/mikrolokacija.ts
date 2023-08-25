import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Mikrolokacija = new Schema({
    naziv: {
        type: String
    },
    opstina:{
        type: String
    }
})

export default mongoose.model('Mikrolokacija', Mikrolokacija, 'mikrolokacije');