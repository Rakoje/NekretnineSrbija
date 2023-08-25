import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Korisnik } from '../models/korisnik.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminServis: AdminService, private ruter: Router) { }

  korisnici_c: Korisnik[];
  korisnici: Korisnik[];
  korisnici_o: Korisnik[];
  korisnik: Korisnik;
  
  ngOnInit(): void {
    if(localStorage.getItem("korisnik")){
      this.korisnik = JSON.parse(localStorage.getItem("korisnik"));
      if(this.korisnik.tip == 3){
        this.adminServis.dohvatiKorisnikeNaCekanju().subscribe((korisnici: Korisnik[])=>{
          this.korisnici_c = korisnici;
        })
        
        this.adminServis.dohvatiOdobreneKorisnike().subscribe((korisnici: Korisnik[])=>{
          this.korisnici = korisnici;
        })
        
        this.adminServis.dohvatiOdbijeneKorisnike().subscribe((korisnici: Korisnik[])=>{
          this.korisnici_o = korisnici;
        })
      }else if(this.korisnik.tip == 1){
        this.ruter.navigate(['kupac']);
      } else{
        this.ruter.navigate(['oglasivac'])
      }
    }else{
      this.ruter.navigate(['']);
    }
  }

  odobri(korisnik){
    this.adminServis.odobri(korisnik.kor_ime).subscribe((odg)=>{
      console.log(odg["poruka"]);
    })
    location.reload();
  }

  odbij(korisnik){
    this.adminServis.odbij(korisnik.kor_ime).subscribe((odg)=>{
      console.log(odg["poruka"]);
    })
    location.reload();
  }
}
