"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('Agencija', Agencija, 'agencije');
//# sourceMappingURL=agencija.js.map