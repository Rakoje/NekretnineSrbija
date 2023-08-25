import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { KupacService } from '../kupac.service';
import { Agencija } from '../models/agencija.model';
import { Korisnik } from '../models/korisnik.model';
import { Nekretnina } from '../models/nekretnina.model';

@Component({
  selector: 'app-nekretnina',
  templateUrl: './nekretnina.component.html',
  styleUrls: ['./nekretnina.component.css']
})
export class NekretninaComponent implements OnInit {

  constructor(private ruter: Router,
    private korisnikServis: KorisnikService,
    private kupacServis: KupacService) { }

  nekretnina: Nekretnina;
  oglasivac: Korisnik;
  agencija: Agencija;
  prosjek_m2: number;
  cena_m2: number;
  prikaz_broja: boolean;
  
  currentSlide = 0;

  ngOnInit(): void {
    this.prosjek_m2 = 0;
    this.prikaz_broja = false;
    if (localStorage.getItem("nekretnina") != null) {
      this.nekretnina = JSON.parse(localStorage.getItem("nekretnina"));
      this.cena_m2 = Math.round(this.nekretnina.cena / this.nekretnina.kvadratura);
      this.korisnikServis.dohvatiKorisnika(this.nekretnina.oglasivac)
        .subscribe((korisnik: Korisnik) => {
          this.oglasivac = korisnik;
          this.korisnikServis.dohvatiAgencijuPoImenu(korisnik.agencija).subscribe((agencija: Agencija) => {
            this.agencija = agencija;
          })
        })
      this.kupacServis.dohvatiNekretninePoMikrolokaciji(this.nekretnina.mikrolokacija)
        .subscribe((nekretnine: Nekretnina[]) => {
          nekretnine.forEach(n => {
            this.prosjek_m2 += n.cena / n.kvadratura;
          })
          this.prosjek_m2 /= nekretnine.length;
          this.prosjek_m2 = Math.round(this.prosjek_m2);
        })
    } else {
      this.ruter.navigate([""]);
    }
  }

  prikaziBroj() {
    this.prikaz_broja = true;
  }

  sakrijBroj() {
    this.prikaz_broja = false;
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.nekretnina.slike.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.nekretnina.slike.length ? 0 : next;
  }
}

