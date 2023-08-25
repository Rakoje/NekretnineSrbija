import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Korisnik } from './models/korisnik.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  uri = 'http://localhost:4000';
  ekstenzija: string;

  constructor(private http: HttpClient) { }

  dohvatiGradove() {
    return this.http.get(`${this.uri}/dohvatiGradove`);
  }

  dohvatiAgencijePoGradu(grad) {
    const data = {
      grad: grad
    }
    return this.http.post(`${this.uri}/dohvatiAgencijePoGradu`, data);
  }

  registrujKorisnika(korisnik: Korisnik, slika: File) {
    const formData = new FormData();

    this.ekstenzija = slika.name.split('?')[0].split('.').pop();

    formData.append('slika', slika, korisnik.kor_ime + '.' + this.ekstenzija);
    formData.append('korisnik', JSON.stringify(korisnik));
    return this.http.post(`${this.uri}/registracija`, formData);
  }
} 
