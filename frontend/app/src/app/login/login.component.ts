import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { KupacService } from '../kupac.service';
import { Korisnik } from '../models/korisnik.model';
import { Nekretnina } from '../models/nekretnina.model';
import { RefreshService } from '../refresh.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService,
    private ruter: Router,
    private refServis: RefreshService,
    private kupacServis: KupacService) { }

  korisnik: Korisnik;
  nekretnine: Nekretnina[];
  nekretnine_sve: Nekretnina[];
  i: number;
  ngOnInit(): void {
    this.i = 0;
    this.korisnikServis.dohvatiNeprodaneNekretnine().subscribe((nekretnine: Nekretnina[]) => {
      this.nekretnine_sve = nekretnine;
      this.nekretnine = new Array(6); 
      while (this.i < 6) {
        this.nekretnine[this.i] = this.nekretnine_sve[this.nekretnine_sve.length - this.i - 1];
        var rand = Math.floor(Math.random() * (this.nekretnine[this.i].slike.length - 1) + 1);
        this.nekretnine[this.i].slika = this.nekretnine[this.i].slike[rand];
        this.i++;
      }
    })
    console.log(this.nekretnine);
    console.log(this.korisnik.tip);
   
    if (localStorage.getItem("korisnik")) {
      this.korisnik = JSON.parse(localStorage.getItem("korisnik"))
      if (this.korisnik.tip == 0) {
        this.ruter.navigate(["kupac"]);
      } else if (this.korisnik.tip == 1 || this.korisnik.tip == 2) {
        this.ruter.navigate(["oglasivac"]);
      } else {
        this.ruter.navigate(["admin"]);
      }
    }
  }

  kor_ime: string;
  lozinka: string;
  poruka: string;

  prijava() {
    this.korisnikServis.prijava(this.kor_ime, this.lozinka).subscribe((korisnik: Korisnik) => {
      if (!korisnik) {
        this.poruka = 'Neispravni podaci. Unesite ponovo.';
      }
      else {
        localStorage.setItem('korisnik', JSON.stringify(korisnik));
        if (korisnik.odobren == 0) {
          this.poruka = "Administrator još uvek nije odobrio Vaš zahtev za registraciju.";
        } else if (korisnik.odobren == -1) {
          this.poruka = "Administrator je odbio Vaš zahtev za registraciju.";
        } else if (korisnik.tip == 0) {
          this.ruter.navigate(['kupac']);
          this.sendMessage("kupac");
        } else if (korisnik.tip == 1 || korisnik.tip == 2) {
          this.ruter.navigate(['oglasivac']);
          this.sendMessage("oglasivac");
        } else {
          this.ruter.navigate(['admin']);
          this.sendMessage("admin");
        }
      }
    })
  }

  sendMessage(tip): void {
    this.refServis.sendUpdate(tip);
  }


  prikazNekretnine(nekretnina) {
    localStorage.setItem("nekretnina", JSON.stringify(nekretnina));
    this.ruter.navigate(['nekretnina']);
  }

}
