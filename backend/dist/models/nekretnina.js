"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Nekretnina = new Schema({
    tip: {
        type: String
    },
    grad: {
        type: String
    },
    opstina: {
        type: String
    },
    mikrolokacija: {
        type: String
    },
    ulica: {
        type: String
    },
    kvadratura: {
        type: Number
    },
    broj_soba: {
        type: Number
    },
    cena: {
        type: Number
    },
    oglasivac: {
        type: String
    },
    godina: {
        type: Number
    },
    stanje: {
        type: String
    },
    tip_grejanja: {
        type: String
    },
    sprat: {
        type: Number
    },
    max_sprat: {
        type: Number
    },
    parking: {
        type: String
    },
    opis: {
        type: String
    },
    sifra: {
        type: String
    },
    karakteristike: {
        type: Object
    },
    prodato: {
        type: Number
    },
    slike: {
        type: Array(String)
    },
    broj_slika: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Nekretnina', Nekretnina, 'nekretnine');
//# sourceMappingURL=nekretnina.js.map