import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija.model';
import { Grad } from '../models/grad.model';
import { Korisnik } from '../models/korisnik.model';
import { RegisterService } from '../register.service';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash'
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private regServis: RegisterService,
    private ruter: Router,
    public formBuilder: FormBuilder,
    private korisnikServis: KorisnikService) { }

  ngOnInit(): void {
    this.regServis.dohvatiGradove().subscribe((gradovi: Grad[]) => {
      this.gradovi = gradovi;
    });
    this.poruka = "";
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    })
    this.siteKey = "6LcVH48eAAAAAApkQHUF3D6-jR3auZPEEXUhnXvw";
  }

  public aFormGroup!: FormGroup;
  public siteKey: any;
  title = 'recaptcha';


  gradovi: Grad[];
  agencije: Agencija[];
  ime: string;
  prezime: string;
  kor_ime: string;
  lozinka: string;
  pon_lozinka: string;
  mejl: string;
  grad: string = "";
  datum: string;
  telefon: string;
  tip: number = -1;
  agencija: string;
  br_licence: string;
  poruka: string = "";
  poruka_slika: string = "";
  ekstenzija: string;
  korisnik: Korisnik;

  dohvatiAgencijePoGradu(grad) {
    this.regServis.dohvatiAgencijePoGradu(grad).subscribe((agencije: Agencija[]) => {
      this.agencije = agencije;
    })
  }

  slika: File = null; // Variable to store file
  greska: boolean = false;
  registracija() {
    this.poruka = "";
    console.log(this.slika);
    this.greska = false;
    if (this.slika == null) {
      this.poruka += "Niste izabrali sliku\n";
      this.greska = true;
    }
    if (this.ime === undefined) {
      this.poruka += "Niste uneli ime\n";
      this.greska = true;
    } else if (this.ime[0] != this.ime[0].toUpperCase()) {
      this.poruka += "Ime  mora počinjati velikim slovom\n";
      this.greska = true;
    }
    if (this.prezime === undefined) {
      this.poruka += "Niste uneli prezime\n";
      this.greska = true;
    } else if (this.prezime[0] != this.prezime[0].toUpperCase()) {
      this.poruka += "Prezime mora počinjati velikim slovom\n";
      this.greska = true;
    }
    if (this.kor_ime === undefined) {
      this.poruka += "Niste uneli korisničko ime\n";
      this.greska = true;
    } else {
      this.korisnikServis.dohvatiKorisnika(this.kor_ime).subscribe((korisnik: Korisnik) => {
        if (korisnik != null) {
          this.poruka += "Postoji korisnik sa datim korisničkim imenom\n";
          this.greska = true;
        }
      })
    }
    if (this.lozinka === undefined) {
      this.poruka += "Niste uneli lozinku\n";
      this.greska = true;
    }
    else {
      var regex = "^(?=.{8,})(?=.*[a-z])(?=.*)(?=.*[A-Z])(?=.*[@#$%^&+='{}<>?]).*$";
      var result = this.lozinka.match(regex);
      if (!result || !(this.lozinka[0] == this.lozinka[0].toUpperCase())) {
        this.poruka += "Lozinka mora počinjati slovom, imati bar jedno veliko, jedan broj i jedan specijalni karakter i minimalno 8 karaktera\n"
        this.greska = true;
      }
    }
    if (this.pon_lozinka === undefined) {
      this.poruka += "Niste uneli ponovljenu lozinku\n";
      this.greska = true;
    }
    else if (this.lozinka != this.pon_lozinka) {
      this.poruka += "Lozinke se ne poklapaju\n";
      this.greska = true;
    }
    regex = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    if (this.mejl === undefined) {
      this.poruka += "Niste uneli mejl\n";
      this.greska = true;
    } else if (!this.mejl.match(regex)) {
      this.poruka += "Neispravan format mejla\n";
      this.greska = true;
    }
    if (this.grad === undefined) {
      this.poruka += "Niste uneli grad\n";
      this.greska = true;
    }
    if (this.datum == null) {
      this.poruka += "Niste uneli datum rodjenja\n";
      this.greska = true;
    }
    regex = "\\+[0-9]{11,20}";
    if (this.telefon === undefined) {
      this.poruka += "Niste uneli broj telefona\n";
      this.greska = true;
    }
    else if (!this.telefon.match(regex)) {
      this.poruka += "Neispravan format broja telefona\n";
      this.greska = true;
    }
    if (this.tip == -1) {
      this.poruka += "Niste uneli tip\n";
      this.greska = true;
    }
    else if (this.tip == 2) {
      if (this.agencija === undefined) {
        this.poruka += "Niste uneli agenciju\n";
        this.greska = true;
      }
      if (this.br_licence === undefined) {
        this.poruka += "Niste uneli broj licence\n";
        this.greska = true;
      }
    }
    if (this.greska == false) {
      this.datum = formatDate(this.datum, 'dd-MM-yyyy', 'en-US');
      this.korisnik = {
        ime: this.ime,
        prezime: this.prezime,
        kor_ime: this.kor_ime,
        lozinka: this.lozinka,
        grad: this.grad,
        datum_rodjenja: this.datum,
        telefon: this.telefon,
        mejl: this.mejl,
        tip: this.tip,
        agencija: this.agencija,
        br_licence: this.br_licence,
        odobren: 0,
      }
      this.regServis.registrujKorisnika(this.korisnik, this.slika).subscribe((resp) => {
        if (resp['message'] == 'korisnik dodat') {
          alert("OK");
          this.ruter.navigate(['']);
        } else {
          alert("ERROR")
        }
      })
    }
  }

  onChange(event) {
    this.poruka_slika = "";
    this.greska = false;
    console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {

      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 300;
      const max_width = 300;
      const min_height = 100;
      const min_width = 100;


      if (!_.includes(allowed_types, event.target.files[0].type)) {
        this.poruka_slika += 'Samo slike su dozvoljene ( JPG / PNG )\n';
        this.greska = true;
      } else {

        const reader = new FileReader();
        var image = new Image();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e: any) => {
          image.src = e.target.result;
          image.onload = () => {

            console.log(image.height);
            console.log(image.width);

            if (image.height > max_height || image.width > max_width ||
              image.height < min_height || image.width < min_width) {
              this.poruka_slika += "Slika nije u dozvoljenim dimenzijama\n";
              this.greska = true;
            }
          }
        }
      }
      if (this.greska == false) {
        this.slika = event.target.files[0];
        this.poruka_slika = "";
      }
    }
  }
}
