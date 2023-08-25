import { Karakteristike } from "./karakteristike.model";

export class Nekretnina {
    tip: string;
    grad: string;
    opstina: string;
    mikrolokacija: string;
    ulica: string;
    kvadratura: number;
    broj_soba: number;
    cena: number;
    oglasivac : string;
    godina: number;
    stanje: string;
    tip_grejanja: string;
    sprat: number;
    max_sprat: number;
    parking: string;
    opis: string; 
    sifra: string;
    karakteristike: Karakteristike;
    prodato: number;
    slike: Array<string>;
    slika: string;
}