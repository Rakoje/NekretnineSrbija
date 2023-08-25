import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Opstina = new Schema({
    naziv: {
        type: String
    },
    grad:{
        type: String
    }
})

export default mongoose.model('Opstina', Opstina, 'opstine');