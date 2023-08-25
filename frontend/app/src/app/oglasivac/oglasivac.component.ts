import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KupacService } from '../kupac.service';
import { Korisnik } from '../models/korisnik.model';
import { Nekretnina } from '../models/nekretnina.model';
import { OglasivacService } from '../oglasivac.service';

@Component({
  selector: 'app-oglasivac',
  templateUrl: './oglasivac.component.html',
  styleUrls: ['./oglasivac.component.css']
})
export class OglasivacComponent implements OnInit {

  constructor(private oglasivacServis: OglasivacService, private ruter: Router, private kupacServise: KupacService) { }

  nekretnine: Nekretnina[]
  korisnik: Korisnik
  ngOnInit(): void {
    if (localStorage.getItem("korisnik")) {
      this.korisnik = JSON.parse(localStorage.getItem("korisnik"));
      this.oglasivacServis.dohvatiNekretninePoAgentu(this.korisnik.kor_ime).subscribe((nekretnine: Nekretnina[]) => {
        this.nekretnine = nekretnine;
      })
    } else {
      this.ruter.navigate(['']);
    }
  }

  prodaj(nekretnina) {
    this.oglasivacServis.prodaj(nekretnina.sifra).subscribe((odg) => {
      console.log(odg['poruka']);
    })
    location.reload();
  }

}
