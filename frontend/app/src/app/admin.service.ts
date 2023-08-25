import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  dohvatiOdobreneKorisnike() {
    return this.http.get(`${this.uri}/dohvatiOdobreneKorisnike`);
  }

  dohvatiOdbijeneKorisnike() {
    return this.http.get(`${this.uri}/dohvatiOdbijeneKorisnike`);
  }

  dohvatiKorisnikeNaCekanju() {
    return this.http.get(`${this.uri}/dohvatiKorisnikeNaCekanju`);
  }

  odobri(kor_ime) {
    const data = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/odobri`, data);
  }

  odbij(kor_ime) {
    const data = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/odbij`, data);
  }

  dodajAgenciju(agencija) {
    const data = {
      agencija: agencija
    }
    return this.http.post(`${this.uri}/dodajAgenciju`, data);
  }
}
