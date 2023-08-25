import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Korisnik } from '../models/korisnik.model';
import { RefreshService } from '../refresh.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private ruter: Router, private refServis: RefreshService) {
    // subscribe to sender component messages
    this.subscriptionName = this.refServis.getUpdate().subscribe(message => { //message contains the data sent from service
      this.ulogovan = true;
      this.korisnik = JSON.parse(localStorage.getItem("korisnik"));
    });
  }

  ulogovan: boolean = false;
  korisnik: Korisnik;
  start: string;

  private subscriptionName: Subscription; //important to create a subscription

  ngOnInit(): void {
    if (localStorage.getItem("korisnik") == null) {
      this.ulogovan = false;
    } else {
      this.korisnik = JSON.parse(localStorage.getItem("korisnik"));
      this.ulogovan = true;
    }
  }

  logout() {
    localStorage.clear();
    this.ruter.navigate(['']);
    this.ngOnInit();
  }

  pocetna() {
    this.ngOnInit();
    if (this.ulogovan) {
      if (this.korisnik.tip == 0) {
        this.start = "kupac";
        this.ruter.navigate(['kupac']);
      } else if (this.korisnik.tip == 1 || this.korisnik.tip == 2) {
        this.start = "oglasivac";
        this.ruter.navigate(['oglasivac']);
      } else {
        this.start = "admin";
        this.ruter.navigate(["admin"]);
      }
    } else {
      this.start = "";
      this.ruter.navigate(['']);
    }
  }
}
