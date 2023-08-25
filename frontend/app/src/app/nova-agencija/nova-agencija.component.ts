import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { KupacService } from '../kupac.service';
import { Agencija } from '../models/agencija.model';
import { Grad } from '../models/grad.model';
import { Korisnik } from '../models/korisnik.model';
import { Mikrolokacija } from '../models/mikrolokacija.model';
import { Opstina } from '../models/opstina.model';
import { Ulica } from '../models/ulica.model';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-nova-agencija',
  templateUrl: './nova-agencija.component.html',
  styleUrls: ['./nova-agencija.component.css']
})
export class NovaAgencijaComponent implements OnInit {

  constructor(private kupacServis: KupacService, 
    private regServis: RegisterService, 
    private ruter: Router, 
    private adminServis: AdminService) { }

  gradovi: Grad[];
  opstine: Opstina[];
  mikrolokacije: Mikrolokacija[];
  ulice: Ulica[];
  agencija: Agencija;

  naziv: string;
  grad: string;
  opstina: string;
  mikrolokacija: string;
  ulica: string;
  telefon: string;
  broj: number;
  PIB: number;
  poruka: string;
  korisnik: Korisnik;
  greska: boolean;

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem("korisnik"));
    if (this.korisnik == null) {
      this.ruter.navigate(['']);
    } else if (this.korisnik.tip != 3) {
      this.ruter.navigate(['']);
    }
    this.regServis.dohvatiGradove().subscribe((gradovi: Grad[]) => {
      this.gradovi = gradovi;
    })
  }


  dohvatiOpstinePoGradu(grad) {
    this.kupacServis.dohvatiOpstinePoGradu(grad).subscribe((opstine: Opstina[]) => {
      this.opstine = opstine;
    })
  }

  dohvatiMikrolokacijePoOpstini(opstina) {
    this.kupacServis.dohvatiMikrolokacijePoOpstini(opstina).subscribe((mikrolokacije: Mikrolokacija[]) => {
      this.mikrolokacije = mikrolokacije;
    })
  }

  dohvatiUlicePoMikrolokaciji(mikrolokacija) {
    this.kupacServis.dohvatiUlicePoMikrolokaciji(mikrolokacija).subscribe((ulice: Ulica[]) => {
      this.ulice = ulice;
    })
  }

  dodajAgenciju() {
    this.poruka = "";
    this.greska = false;
    console.log(this.naziv);
    if (this.naziv === undefined) {
      this.poruka += "Niste uneli naziv\n";
      this.greska = true;
    } else if(this.naziv[0] == this.naziv[0].toUpperCase()){
      this.poruka += "Naziv mora počinjati velikim slovom\n";
      this.greska = true;  
    }
    if (this.grad === undefined) {
      this.poruka += "Niste uneli grad\n";
      this.greska = true;
    }
    if (this.opstina === undefined) {
      this.poruka += "Niste uneli opstinu\n";
      this.greska = true;
    }
    if (this.mikrolokacija === undefined) {
      this.poruka += "Niste uneli mikrolokaciju\n";
      this.greska = true;
    }
    if (this.ulica === undefined) {
      this.poruka += "Niste uneli ulicu\n";
      this.greska = true;
    }
    if (this.broj === undefined) {
      this.poruka += "Niste uneli broj adrese\n";
      this.greska = true;
    }
    var regex = "\\+[0-9]{11,20}";
    if (this.telefon === undefined) {
      this.poruka += "Niste uneli broj telefona\n";
      this.greska = true;
    } else if (!this.telefon.match(regex)){
      this.poruka += "Neispravan format broja telefona\n";
      this.greska = true;  
    }
    if (this.PIB === undefined) {
      this.poruka += "Niste uneli PIB\n";
      this.greska = true;
    } else if (this.PIB <= 10000001 || this.PIB >= 999999999) {
      this.poruka += "Uneti PIB nije validan\n";
      this.greska = true;
    }
    if (this.greska == false) {
      this.agencija = {
        naziv: this.naziv,
        grad: this.grad,
        adresa: this.ulica + " " + this.broj,
        telefon: this.telefon,
        PIB: this.PIB
      }
      this.adminServis.dodajAgenciju(this.agencija).subscribe((odg) => {
        alert(odg["poruka"]);
      });
      this.ruter.navigate(["admin"]);
    }
  }
}
