import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nekretnina } from './models/nekretnina.model';

@Injectable({
  providedIn: 'root'
})
export class KupacService {

  constructor(private http: HttpClient) { }

  
  uri = 'http://localhost:4000';

  dohvatiOpstinePoGradu(grad){
    const data={
      grad: grad
    }
    return this.http.post(`${this.uri}/dohvatiOpstinePoGradu`, data);
  }

  dohvatiMikrolokacijePoOpstini(opstina){
    const data={
      opstina: opstina
    }
    return this.http.post(`${this.uri}/dohvatiMikrolokacijePoOpstini`, data);
  }

  dohvatiUlicePoMikrolokaciji(mikrolokacija){
    const data={
      mikrolokacija: mikrolokacija
    }
    return this.http.post(`${this.uri}/dohvatiUlicePoMikrolokaciji`, data);
  }

  pretraziNekretnine(tip, e: any, broj_soba, cena){
    const data={
      tip: tip,
      grad: e.grad,
      opstina: e.opstina,
      mikrolokacija: e.mikrolokacija,
      broj_soba: broj_soba,
      cena: cena,
    }
    return this.http.post(`${this.uri}/pretraziNekretnine`, data);  
  }

  dohvatiNekretninePoMikrolokaciji(mikrolokacija){
    const data={
      mikrolokacija: mikrolokacija
    }
    return this.http.post(`${this.uri}/dohvatiNekretninePoMikrolokaciji`, data);    
  }
  sortirajNekretninePoProdatosti(nekretnine: Nekretnina[]){
    return nekretnine.sort((a,b)=>{
      return a.prodato - b.prodato
    });
  }
}
