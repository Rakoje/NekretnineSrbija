import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Grad = new Schema({
    naziv: {
        type: String
    }
})

export default mongoose.model('Grad', Grad, 'gradovi');