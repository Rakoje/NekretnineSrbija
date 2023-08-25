import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KupacService } from '../kupac.service';
import { Grad } from '../models/grad.model';
import { Karakteristike } from '../models/karakteristike.model';
import { Korisnik } from '../models/korisnik.model';
import { Mikrolokacija } from '../models/mikrolokacija.model';
import { Nekretnina } from '../models/nekretnina.model';
import { Opstina } from '../models/opstina.model';
import { Ulica } from '../models/ulica.model';
import { OglasivacService } from '../oglasivac.service';
import { RegisterService } from '../register.service';
import * as _ from 'lodash';
import { ModalService } from '../_modal';
import { Agencija } from '../models/agencija.model';

@Component({
  selector: 'app-nova-nekretnina',
  templateUrl: './nova-nekretnina.component.html',
  styleUrls: ['./nova-nekretnina.component.css']
})
export class NovaNekretninaComponent implements OnInit {

  constructor(private kupacServis: KupacService,
    private ruter: Router,
    private regServis: RegisterService,
    private oglasivacServis: OglasivacService,
    private modalServis: ModalService) { }

  ekstenzija: string;
  gradovi: Grad[];
  opstine: Opstina[];
  mikrolokacije: Mikrolokacija[];
  ulice: Ulica[];
  tip: string;
  grad: string;
  opstina: string;
  mikrolokacija: string;
  ulica: string;
  broj: number;
  kvadratura: number;
  broj_soba: number;
  cena: number;
  godina: number;
  stanje: string;
  tip_grejanja: string;
  sprat: number;
  max_sprat: number;
  parking: string;
  opis: string;
  sifra: string;
  karakteristike: Karakteristike;
  slike: File[];
  jsonFile: File;
  nazivi_slika: string[];
  poruka: string;
  poruka_json: string;
  poruka_slika: string;
  greska: boolean = false;
  json_nekretnina: Object;
  json_string: string;

  terasa: any;
  lodja: any;
  francuski_balkon: any;
  lift: any;
  podrum: any;
  garaza: any;
  basta: any;
  klima: any;
  internet: any;
  interfon: any;
  telefon: any;
  korisnik: Korisnik;

  nekretnina: Nekretnina;
  ngOnInit(): void {
    if (localStorage.getItem("korisnik")) {
      this.korisnik = JSON.parse(localStorage.getItem("korisnik"));
      this.regServis.dohvatiGradove().subscribe((gradovi: Grad[]) => {
        this.gradovi = gradovi;
      })
    } else {
      this.ruter.navigate(['']);
    }
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

  dodajIzJsona() {
    if (!this.json_nekretnina.hasOwnProperty("Advertiser") ||
      !this.json_nekretnina.hasOwnProperty("Realestate")) {
      this.poruka += "JSON nije u zadatom formatu\n";
      this.greska = true;
    } else {
      console.log(this.json_nekretnina["Advertiser"]);
      var a: Array<Object> = this.json_nekretnina["Advertiser"];
      var r: Object = this.json_nekretnina["Realestate"];
      if (!r.hasOwnProperty("About") || !r.hasOwnProperty("Area") ||
        !r.hasOwnProperty("Characteristics") || !r.hasOwnProperty("City") ||
        !r.hasOwnProperty("ConstructionYear") || !r.hasOwnProperty("Floor") ||
        !r.hasOwnProperty("Heating") || !r.hasOwnProperty("Microlocation") ||
        !r.hasOwnProperty("MonthlyUtilities") || !r.hasOwnProperty("Municipality") ||
        !r.hasOwnProperty("Name") || !r.hasOwnProperty("Parking") ||
        !r.hasOwnProperty("Price") || !r.hasOwnProperty("Rooms") ||
        !r.hasOwnProperty("State") || !r.hasOwnProperty("Street") || !r.hasOwnProperty("TotalFloors")) {
        this.poruka += "JSON nije u zadatom formatu\n";
        this.greska = true;
      } else {
        if (a.length == 1) {
          var vlasnik = a[0];
          if (!vlasnik.hasOwnProperty("FirstName") ||
            !vlasnik.hasOwnProperty("LastName") ||
            !vlasnik.hasOwnProperty("Phone")) {
            this.poruka += "JSON nije u zadatom formatu\n";
            this.greska = true;
          } else if (vlasnik["FirstName"] != this.korisnik.ime || vlasnik["LastName"] != this.korisnik.prezime) {
            this.poruka += "Ne možete uneti nekretninu pod tuđim imenom\n";
            this.greska = true;
          }
        } else if (a.length == 2) {
          var agencija = a[0];
          var agent = a[1];
          if (!agencija.hasOwnProperty("Address") || !agencija.hasOwnProperty("City") ||
            !agencija.hasOwnProperty("Name") || !agencija.hasOwnProperty("PIB") ||
            !agencija.hasOwnProperty("Phone") || !agencija.hasOwnProperty("Type")) {
            this.poruka += "JSON nije u zadatom formatu\n";
            this.greska = true;
          } else if (!agent.hasOwnProperty("FirstName") ||
            !agent.hasOwnProperty("LastName") ||
            !agent.hasOwnProperty("Phone")) {
            this.poruka += "JSON nije u zadatom formatu\n";
            this.greska = true;
          } else if (agent["FirstName"] != this.korisnik.ime || agent["LastName"] != this.korisnik.prezime) {
            this.poruka += "Ne možete uneti nekretninu pod tuđim imenom\n";
            this.greska = true;
          } else if (agencija["Name"] != this.korisnik.agencija) {
            this.poruka += "Ne radite u zadatoj agenciji\n";
            this.greska = true;
          } else {
            this.oglasivacServis.dohvatiAgenciju(agencija["Name"],
              agencija["Address"], agencija["City"], agencija["Phone"], agencija["PIB"])
              .subscribe((agencija: Agencija) => {
                if (agencija == null) {
                  this.poruka += "Agencija ne postoji u bazi podataka\n";
                  this.greska = true;
                }
              })
          }
        } else {
          this.poruka += "JSON nije u zadatom formatu\n";
          this.greska = true;
        }
      }
    }
    if (this.greska == false) {
      var k: Array<String> = this.json_nekretnina["Realestate"]["Characteristics"];
      var n: Object = this.json_nekretnina["Realestate"];
      if (!k.includes("Terasa")) {
        this.terasa = false;
      } else {
        this.terasa = true;
      }
      if (!k.includes("Lodja")) {
        this.lodja = false;
      } else {
        this.lodja = true;
      }
      if (!k.includes("Francuski balkon")) {
        this.francuski_balkon = false;
      } else {
        this.francuski_balkon = true;
      }
      if (!k.includes("Lift")) {
        this.lift = false;
      } else {
        this.lift = true;
      }
      if (!k.includes("Podrum")) {
        this.podrum = false;
      } else {
        this.podrum = true;
      }
      if (!k.includes("Garaža")) {
        this.garaza = false;
      } else {
        this.garaza = true;
      }
      if (!k.includes("Bašta")) {
        this.basta = false;
      } else {
        this.basta = true;
      }
      if (!k.includes("Klima")) {
        this.klima = false;
      } else {
        this.klima = true;
      }
      if (!k.includes("Internet")) {
        this.internet = false;
      } else {
        this.internet = true;
      }
      if (!k.includes("Interfon")) {
        this.interfon = false;
      } else {
        this.interfon = true;
      }
      if (!k.includes("telefon")) {
        this.telefon = false;
      } else {
        this.telefon = true;
      }
      this.tip = n["Name"];
      this.grad = n["City"];
      this.opstina = n["Municipality"];
      this.mikrolokacija = n["Microlocation"];
      this.ulica = n["Street"];
      var parts = this.ulica.split(' ');
      this.ulica = "";
      parts.forEach(e =>{
        if(e != parts[parts.length - 1]){
          this.ulica += e + " ";
        }
      })
      this.broj = Number(parts[parts.length - 1]);
      this.kvadratura = n["Area"];
      this.godina = n["ConstructionYear"];
      this.stanje = n["State"];
      this.sprat = n["Floor"];
      this.max_sprat = n["TotalFloors"];
      this.parking = n["Parking"];
      this.tip_grejanja = n["Heating"];
      this.cena = n["Price"];
      this.opis = n["About"];
      this.broj_soba = n["Rooms"];
    }
  }

  dodajNekretninu() {
    this.greska = false;
    this.poruka = "";
    if (this.slike == null || this.slike.length < 3 || this.slike.length > 6) {
      this.poruka += "Broj izabranih slika nije dozvoljen\n";
      this.greska = true;
    }
    if (this.jsonFile !== undefined) {
      if (!this.greska) this.dodajIzJsona();
      if (this.greska) return;
    }
    if (this.tip === undefined) {
      this.poruka += "Niste uneli tip\n";
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
    } else if (this.broj <= 0) {
      this.poruka += "Broj adrese mora biti veći od nule\n";
      this.greska = true;
    }
    if (this.kvadratura === undefined) {
      this.poruka += "Niste uneli kvadraturu\n";
      this.greska = true;
    } else if (isNaN(Number(this.kvadratura))) {
      this.poruka += "Kvadratura mora biti broj\n";
      this.greska = true;
    } else if (Number(this.broj_soba) < 0) {
      this.poruka += "Kvadratura mora biti veći od nule\n";
      this.greska = true;
    }
    if (this.broj_soba === undefined) {
      this.poruka += "Niste uneli broj soba\n";
      this.greska = true;
    } else if (isNaN(Number(this.broj_soba))) {
      this.poruka += "Broj soba mora biti broj\n";
      this.greska = true;
    } else if (Number(this.broj_soba) < 0) {
      this.poruka += "Broj soba mora biti veći od nule\n";
      this.greska = true;
    }
    if (this.cena === undefined) {
      this.poruka += "Niste uneli cenu\n";
      this.greska = true;
    } else if (isNaN(Number(this.cena))) {
      this.poruka += "Cena mora biti broj\n";
      this.greska = true;
    } else if (Number(this.broj_soba) < 0) {
      this.poruka += "Cena mora biti veća od nule\n";
      this.greska = true;
    }
    if (this.godina === undefined) {
      this.poruka += "Niste uneli godinu\n";
      this.greska = true;
    } else if (isNaN(Number(this.godina))) {
      this.poruka += "Godina mora biti broj\n";
      this.greska = true;
    } else if (Number(this.broj_soba) < 0) {
      this.poruka += "Godina mora biti veća od nule\n";
      this.greska = true;
    } else if (Number(this.broj_soba) > 2022) {
      this.poruka += "Godina ne može biti veća od tekuće\n";
      this.greska = true;
    }
    if (this.stanje === undefined) {
      this.poruka += "Niste uneli stanje\n";
      this.greska = true;
    }
    if (this.tip_grejanja === undefined) {
      this.poruka += "Niste uneli tip grejanja\n";
      this.greska = true;
    }
    if (this.sprat === undefined) {
      this.poruka += "Niste uneli sprat\n";
      this.greska = true;
    } else if (isNaN(Number(this.sprat))) {
      this.poruka += "Sprat mora biti broj\n";
      this.greska = true;
    } else if (Number(this.sprat) < 0) {
      this.poruka += "Sprat mora biti veći od nule\n";
      this.greska = true;
    }
    if (this.max_sprat === undefined) {
      this.poruka += "Niste uneli ukupnu spratnost\n";
      this.greska = true;
    } else if (isNaN(Number(this.max_sprat))) {
      this.poruka += "Ukupna spratnost mora biti broj\n";
      this.greska = true;
    } else if (Number(this.broj_soba) < 0) {
      this.poruka += "Ukupna spratnost mora biti veća od nule\n";
      this.greska = true;
    }
    if ((!isNaN(Number(this.sprat)) && !isNaN(Number(this.max_sprat))) && this.max_sprat < this.sprat) {
      this.poruka += "Sprat ne moze biti veći od ukupne spratnosti";
      this.greska = true;
    }
    if (this.parking === undefined) {
      this.poruka += "Niste uneli parking\n";
      this.greska = true;
    }
    if (this.opis === undefined) {
      this.poruka += "Niste uneli opis\n";
      this.greska = true;
    } else if (this.opis.split(" ").length > 50) {
      this.poruka += "Opis ima vise od 50 reči\n";
      this.greska = true;
    }
    if (this.greska == false) {
      this.kupacServis.dohvatiNekretninePoMikrolokaciji(this.mikrolokacija).subscribe((nekretnine: Nekretnina[]) => {
        if (nekretnine.length != 0) {
          let broj_sifra = Number(nekretnine[nekretnine.length - 1].sifra.slice(this.mikrolokacija.length));
          broj_sifra++;
          this.sifra = this.mikrolokacija + broj_sifra;
        } else {
          this.sifra = this.mikrolokacija + 1;
        }
        if (this.terasa != true) {
          this.terasa = 0;
        } else {
          this.terasa = 1;
        }
        if (this.lodja != true) {
          this.lodja = 0;
        } else {
          this.lodja = 1;
        }
        if (this.francuski_balkon != true) {
          this.francuski_balkon = 0;
        } else {
          this.francuski_balkon = 1;
        }
        if (this.lift != true) {
          this.lift = 0;
        } else {
          this.lift = 1;
        }
        if (this.podrum != true) {
          this.podrum = 0;
        } else {
          this.podrum = 1;
        }
        if (this.garaza != true) {
          this.garaza = 0;
        } else {
          this.garaza = 1;
        }
        if (this.basta != true) {
          this.basta = 0;
        } else {
          this.basta = 1;
        }
        if (this.klima != true) {
          this.klima = 0;
        } else {
          this.klima = 1;
        }
        if (this.internet != true) {
          this.internet = 0;
        } else {
          this.internet = 1;
        }
        if (this.interfon != true) {
          this.interfon = 0;
        } else {
          this.interfon = 1;
        }
        if (this.telefon != true) {
          this.telefon = 0;
        } else {
          this.telefon = 1;
        }
        let i = 1
        this.nazivi_slika = new Array(this.slike.length);
        for (let img of this.slike) {
          this.ekstenzija = img.name.split('?')[0].split('.').pop();
          this.nazivi_slika[i - 1] = this.sifra + "-" + i + "." + this.ekstenzija;
          i++;
        }
        if(this.ulica[this.ulica.length - 1] != " ") this.ulica = this.ulica + " " + this.broj;
        else this.ulica = this.ulica + this.broj;
        this.nekretnina = {
          tip: this.tip,
          grad: this.grad,
          opstina: this.opstina,
          mikrolokacija: this.mikrolokacija,
          ulica: this.ulica,
          kvadratura: this.kvadratura,
          broj_soba: this.broj_soba,
          cena: this.cena,
          oglasivac: this.korisnik.kor_ime,
          godina: this.godina,
          stanje: this.stanje,
          tip_grejanja: this.tip_grejanja,
          sprat: this.sprat,
          max_sprat: this.max_sprat,
          parking: this.parking,
          opis: this.opis,
          sifra: this.sifra,
          karakteristike: {
            terasa: this.terasa,
            lodja: this.lodja,
            francuski_balkon: this.francuski_balkon,
            lift: this.lift,
            podrum: this.podrum,
            garaza: this.garaza,
            basta: this.basta,
            klima: this.klima,
            internet: this.internet,
            interfon: this.interfon,
            telefon: this.telefon
          },
          prodato: 0,
          slike: this.nazivi_slika,
          slika: ""
        }
        this.oglasivacServis.dodajNekretninu(this.nekretnina, this.slike).subscribe((odg) => {
          alert(odg["poruka"]);
        });
        setTimeout(() => {
          this.ruter.navigate(["oglasivac"]);
        }, 1000)
      })
    }
  }

  onFileChange(event) {
    this.poruka_json = "";
    this.jsonFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.jsonFile, "UTF-8");
    fileReader.onload = () => {
      try {
        console.log(JSON.parse(fileReader.result.toString()));
        this.json_nekretnina = JSON.parse(fileReader.result.toString());
        this.greska = false;
      } catch (e) {
        this.poruka_json = "Datoteka nije validan JSON\n";
        this.jsonFile = undefined;
        this.greska = true;
      }
    }
  }
  onChange(event) {
    this.poruka_slika = "";
    this.greska = false;
    var a = Array.from(event.target.files);
    console.log(a);
    if (event.target.files && event.target.files[0]) {

      const allowed_types = ['image/png', 'image/jpeg'];

      a.forEach((e: File) => {
        if (!_.includes(allowed_types, e.type) && !this.greska) {
          this.poruka_slika += 'Samo slike su dozvoljene ( JPG / PNG )\n';
          this.slike = undefined;
          this.greska = true;
        }
      });
      if (this.greska == false) {
        this.slike = event.target.files;
        this.poruka_slika = "";
      }
    }
  }
  openModal(id: string) {
    this.modalServis.open(id);
  }

  closeModal(id: string) {
    this.modalServis.close(id);
  }
}
