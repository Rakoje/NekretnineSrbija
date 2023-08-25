import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  prijava(kor_ime, lozinka){
    const data={
      kor_ime: kor_ime,
      lozinka: lozinka
    }
    return this.http.post(`${this.uri}/prijava`, data);
  }

  dohvatiKorisnika(kor_ime){
    const data={
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/dohvatiKorisnika`, data);
  }

  dohvatiAgencijuPoImenu(naziv){
    const data={
      naziv: naziv
    }
    return this.http.post(`${this.uri}/dohvatiAgencijuPoImenu`, data);
  }

  dohvatiNekretnine(){
    return this.http.get(`${this.uri}/dohvatiNekretnine`);
  }

  
  dohvatiNeprodaneNekretnine(){
    return this.http.get(`${this.uri}/dohvatiNeprodaneNekretnine`);
  }

  
}
