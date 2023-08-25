"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
    mejl: {
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
});
exports.default = mongoose_1.default.model('Korisnik', Korisnik, 'korisnici');
//# sourceMappingURL=korisnik.js.map