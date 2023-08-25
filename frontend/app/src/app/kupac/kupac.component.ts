import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KupacService } from '../kupac.service';
import { Grad } from '../models/grad.model';
import { Mikrolokacija } from '../models/mikrolokacija.model';
import { Nekretnina } from '../models/nekretnina.model';
import { Opstina } from '../models/opstina.model';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css']
})
export class KupacComponent implements OnInit {
  greska: boolean = false;
  poruka: string = "";

  constructor(private regServis: RegisterService,
    private kupacServis: KupacService,
    private ruter: Router) { }

  gradovi: Grad[];
  mikrolokacije: Mikrolokacija[];
  opstine: Opstina[];
  nekretnine: Nekretnina[];

  izabrane: Array<any>;
  trenutna: any;
  ucitavanje: boolean;

  ngOnInit(): void {
    if (localStorage.getItem("korisnik") == null) {
      this.ruter.navigate([""]);
    } else {
      this.regServis.dohvatiGradove().subscribe((gradovi: Grad[]) => {
        this.gradovi = gradovi;
      })
    }
    this.izabrane = new Array();
  }
  grad: string;
  opstina: string;
  mikrolokacija: string;
  tip: string;
  broj_soba: number;
  cena: number;

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

  dodajLokaciju() {
    this.poruka = "";
    var ima = false;
    this.trenutna = {
      grad: this.grad,
      opstina: this.opstina,
      mikrolokacija: this.mikrolokacija
    }
    this.izabrane.forEach(e => {
      if (e.grad == this.trenutna.grad &&
        e.opstina == this.trenutna.opstina &&
        e.mikrolokacija == this.trenutna.mikrolokacija && !ima) {
        this.poruka += "Već ste dodali izabranu lokaciju\n";
        ima = true;
      }
    });
    if (!ima) {
      this.izabrane.push(this.trenutna);
    }
    console.log(this.izabrane);
  }

  ukloni(lokacija) {
    for (var i = 0; i < this.izabrane.length; i++) {
      var e = this.izabrane[i];
      if (e.grad == lokacija.grad &&
        e.opstina == lokacija.opstina &&
        e.mikrolokacija == lokacija.mikrolokacija) {
        this.izabrane.splice(i, 1);
      }
    }
  }

  pretraziNekretnine() {
    this.greska = false;
    var prvi = false;
    this.ucitavanje = false;
    this.poruka = "";
    if (this.tip === undefined) {
      this.poruka += "Morate izabrati tip\n";
      this.greska = true;
    }
    if (this.broj_soba === undefined) {
      this.broj_soba == 0;
    }
    console.log(this.broj_soba);
    if (this.cena === undefined) {
      this.cena = -1;
    }
    if (this.grad !== undefined) {
      if (this.opstina === undefined || this.mikrolokacije === undefined) {
        this.poruka += "Morate izabrati lokaciju u formatu grad/opština/mikrolokacija\n";
        this.greska = true;
      }
    }
    if (this.greska == false) {
      if (this.izabrane.length > 0) {
        this.izabrane.forEach(element => {
          this.kupacServis.pretraziNekretnine(
            this.tip,
            element,
            this.broj_soba,
            this.cena).subscribe((nekretnine: Nekretnina[]) => {
              if (!prvi) {
                prvi = true;
                this.nekretnine = nekretnine;
              } else {
                nekretnine.forEach(element => {
                  this.nekretnine.push(element);
                });
              }
            });
        });
    } else {
        this.kupacServis.pretraziNekretnine(
          this.tip,
          { grad: undefined, opstina: undefined, mikrolokacija: undefined },
          this.broj_soba,
          this.cena).subscribe((nekretnine: Nekretnina[]) => {
            this.nekretnine = nekretnine;
          });
      }
      console.log(this.nekretnine);
      this.ucitavanje = true;
      setTimeout(() => {
        localStorage.setItem("nekretnine", JSON.stringify(this.nekretnine));
        console.log(localStorage.getItem("nekretnine"));
        this.ruter.navigate(['rezultati']);
      }, 1500);
    }
  }
}
