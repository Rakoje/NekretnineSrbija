import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KupacService } from '../kupac.service';
import { Nekretnina } from '../models/nekretnina.model';

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {

  constructor(private ruter: Router, private kupacServis: KupacService) { }

  nekretnine: Array<Nekretnina>;
  ngOnInit(): void {
    if (localStorage.getItem("korisnik")) {
      let i = 0;
      this.nekretnine = JSON.parse(localStorage.getItem("nekretnine"));
      console.log(localStorage.getItem("nekretnine"));
    } else {
      this.ruter.navigate(['']);
    }
  }

  prikazNekretnine(nekretnina) {
    localStorage.setItem("nekretnina", JSON.stringify(nekretnina));
  }
}
