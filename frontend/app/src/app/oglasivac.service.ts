import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nekretnina } from './models/nekretnina.model';

@Injectable({
  providedIn: 'root'
})
export class OglasivacService {

  ekstenzija: string;
  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  dohvatiNekretninePoAgentu(kor_ime) {
    const data = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/dohvatiNekretninePoAgentu`, data);
  }

  prodaj(sifra) {
    const data = {
      sifra: sifra
    }

    return this.http.post(`${this.uri}/prodaj`, data);
  }

  dodajNekretninu(nekretnina: Nekretnina, slike: File[]) {
    const formData = new FormData();
    let i = 1;
    for (let img of slike) {
      this.ekstenzija = img.name.split('?')[0].split('.').pop();
      formData.append('slike', img, nekretnina.sifra + '-' + i + "." + this.ekstenzija);
      i++;
    }
    formData.append('nekretnina', JSON.stringify(nekretnina));

    return this.http.post(`${this.uri}/dodajNekretninu`, formData);
  }

  dohvatiKorisnikaPoImenuIPrezimenu(ime, prezime){
    const data ={
      ime: ime,
      prezime: prezime
    }
    return this.http.post(`${this.uri}/dohvatiKorisnikaPoImenuIPrezimenu`, data);
  }

  dohvatiAgenciju(naziv, adresa, grad, telefon, PIB){
    const data = {
      naziv: naziv,
      adresa: adresa,
      grad: grad,
      telefon: telefon,
      PIB: PIB
    }
    return this.http.post(`${this.uri}/dohvatiAgenciju`, data);
  }
}
