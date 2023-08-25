"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const grad_1 = __importDefault(require("./models/grad"));
const agencija_1 = __importDefault(require("./models/agencija"));
const korisnik_1 = __importDefault(require("./models/korisnik"));
const opstina_1 = __importDefault(require("./models/opstina"));
const mikrolokacija_1 = __importDefault(require("./models/mikrolokacija"));
const nekretnina_1 = __importDefault(require("./models/nekretnina"));
const ulica_1 = __importDefault(require("./models/ulica"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const multer = require('multer');
mongoose_1.default.connect('mongodb://localhost:27017/nekretnine2022');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connection ok');
});
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '../frontend/app/src/assets/img');
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
const router = express_1.default.Router();
app.use('/', router);
// Gradovi
router.route('/dohvatiGradove').get((req, res) => {
    grad_1.default.find({}, (err, gradovi) => {
        if (err)
            console.log(err);
        else
            res.json(gradovi);
    });
});
router.route('/dohvatiOpstinePoGradu').post((req, res) => {
    let grad = req.body.grad;
    opstina_1.default.find({ "grad": grad }, (err, opstine) => {
        if (err)
            console.log(err);
        else
            res.json(opstine);
    });
});
router.route('/dohvatiMikrolokacijePoOpstini').post((req, res) => {
    let opstina = req.body.opstina;
    mikrolokacija_1.default.find({ "opstina": opstina }, (err, mikrolokacije) => {
        if (err)
            console.log(err);
        else
            res.json(mikrolokacije);
    });
});
router.route('/dohvatiUlicePoMikrolokaciji').post((req, res) => {
    let mikrolokacija = req.body.mikrolokacija;
    ulica_1.default.find({ "mikrolokacija": mikrolokacija }, (err, ulice) => {
        if (err)
            console.log(err);
        else
            res.json(ulice);
    });
});
// Nekretnine
app.post('/dodajNekretninu', upload.array('slike'), (req, res) => {
    let tmp = JSON.parse(req.body.nekretnina);
    console.log(tmp);
    let n = new nekretnina_1.default({
        tip: tmp.tip,
        grad: tmp.grad,
        opstina: tmp.opstina,
        mikrolokacija: tmp.mikrolokacija,
        ulica: tmp.ulica,
        kvadratura: tmp.kvadratura,
        broj_soba: tmp.broj_soba,
        cena: tmp.cena,
        oglasivac: tmp.oglasivac,
        godina: tmp.godina,
        stanje: tmp.stanje,
        tip_grejanja: tmp.tip_grejanja,
        sprat: tmp.sprat,
        max_sprat: tmp.max_sprat,
        parking: tmp.parking,
        opis: tmp.opis,
        sifra: tmp.sifra,
        karakteristike: tmp.karakteristike,
        prodato: tmp.prodato,
        slike: tmp.slike,
        broj_slika: tmp.broj_slika
    });
    n.save().then(nekretnina => {
        res.status(200).json({ 'poruka': 'nekretnina dodata' });
    }).catch(err => {
        res.status(400).json({ 'poruka': 'greska' });
    });
});
router.route('/pretraziNekretnine').post((req, res) => {
    if (req.body.broj_soba == 0 || req.body.broj_soba === undefined) {
        if (req.body.cena == -1) {
            if (req.body.grad !== undefined) {
                nekretnina_1.default.find({
                    "tip": req.body.tip,
                    "grad": req.body.grad,
                    "opstina": req.body.opstina,
                    "mikrolokacija": req.body.mikrolokacija,
                    "prodato": 0
                }, (err, nekretnine) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(nekretnine);
                });
            }
            else {
                nekretnina_1.default.find({
                    "tip": req.body.tip,
                    "prodato": 0
                }, (err, nekretnine) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(nekretnine);
                });
            }
        }
        else {
            if (req.body.grad !== undefined) {
                nekretnina_1.default.find({
                    "tip": req.body.tip,
                    "grad": req.body.grad,
                    "opstina": req.body.opstina,
                    "mikrolokacija": req.body.mikrolokacija,
                    "prodato": 0,
                    "cena": { $lt: req.body.cena }
                }, (err, nekretnine) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(nekretnine);
                });
            }
            else {
                nekretnina_1.default.find({
                    "tip": req.body.tip,
                    "prodato": 0,
                    "cena": { $lt: req.body.cena }
                }, (err, nekretnine) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(nekretnine);
                });
            }
        }
    }
    else if (req.body.broj_soba != 5) {
        if (req.body.cena == -1) {
            if (req.body.grad !== undefined) {
                nekretnina_1.default.find({
                    "tip": req.body.tip,
                    "grad": req.body.grad,
                    "broj_soba": req.body.broj_soba,
                    "opstina": req.body.opstina,
                    "mikrolokacija": req.body.mikrolokacija,
                    "prodato": 0
                }, (err, nekretnine) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(nekretnine);
                });
            }
            else {
                nekretnina_1.default.find({
                    "tip": req.body.tip,
                    "broj_soba": req.body.broj_soba,
                    "prodato": 0
                }, (err, nekretnine) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(nekretnine);
                });
            }
        }
        else {
            if (req.body.grad !== undefined) {
                nekretnina_1.default.find({
                    "tip": req.body.tip,
                    "grad": req.body.grad,
                    "broj_soba": req.body.broj_soba,
                    "opstina": req.body.opstina,
                    "mikrolokacija": req.body.mikrolokacija,
                    "prodato": 0,
                    "cena": { $lt: req.body.cena }
                }, (err, nekretnine) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(nekretnine);
                });
            }
            else {
                nekretnina_1.default.find({
                    "tip": req.body.tip,
                    "broj_soba": req.body.broj_soba,
                    "prodato": 0,
                    "cena": { $lt: req.body.cena }
                }, (err, nekretnine) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(nekretnine);
                });
            }
        }
    }
    else {
        if (req.body.cena == -1) {
            if (req.body.grad !== undefined) {
                nekretnina_1.default.find({
                    "tip": req.body.tip,
                    "grad": req.body.grad,
                    "broj_soba": { $gt: req.body.broj_soba },
                    "opstina": req.body.opstina,
                    "mikrolokacija": req.body.mikrolokacija,
                    "prodato": 0
                }, (err, nekretnine) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(nekretnine);
                });
            }
            else {
                nekretnina_1.default.find({
                    "tip": req.body.tip,
                    "broj_soba": { $gt: req.body.broj_soba },
                    "prodato": 0
                }, (err, nekretnine) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(nekretnine);
                });
            }
        }
        else {
            if (req.body.grad !== undefined) {
                nekretnina_1.default.find({
                    "tip": req.body.tip,
                    "grad": req.body.grad,
                    "broj_soba": { $gt: req.body.broj_soba },
                    "opstina": req.body.opstina,
                    "mikrolokacija": req.body.mikrolokacija,
                    "prodato": 0,
                    "cena": { $lt: req.body.cena }
                }, (err, nekretnine) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(nekretnine);
                });
            }
            else {
                nekretnina_1.default.find({
                    "tip": req.body.tip,
                    "broj_soba": { $gt: req.body.broj_soba },
                    "prodato": 0,
                    "cena": { $lt: req.body.cena }
                }, (err, nekretnine) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(nekretnine);
                });
            }
        }
    }
});
router.route('/dohvatiNekretninePoMikrolokaciji').post((req, res) => {
    let mikrolokacija = req.body.mikrolokacija;
    nekretnina_1.default.find({ "mikrolokacija": mikrolokacija }, (err, nekretnina) => {
        if (err)
            console.log(err);
        else
            res.json(nekretnina);
    });
});
router.route('/dohvatiNekretninePoAgentu').post((req, res) => {
    let kor_ime = req.body.kor_ime;
    nekretnina_1.default.find({ "oglasivac": kor_ime }, (err, nekretnine) => {
        if (err)
            console.log(err);
        else
            res.json(nekretnine);
    });
});
router.route('/dohvatiNekretnine').get((req, res) => {
    nekretnina_1.default.find({}, (err, nekretnine) => {
        if (err)
            console.log(err);
        else
            res.json(nekretnine);
    });
});
router.route('/dohvatiNeprodaneNekretnine').get((req, res) => {
    nekretnina_1.default.find({ "prodato": 0 }, (err, nekretnine) => {
        if (err)
            console.log(err);
        else
            res.json(nekretnine);
    });
});
router.route('/prodaj').post((req, res) => {
    let sifra = req.body.sifra;
    nekretnina_1.default.collection.updateOne({ "sifra": sifra }, { $set: { "prodato": 1 } });
    res.json({ poruka: "ok" });
});
// Agencije
router.route('/dohvatiAgenciju').post((req, res) => {
    let naziv = req.body.naziv;
    let adresa = req.body.adresa;
    let PIB = req.body.PIB;
    let grad = req.body.grad;
    agencija_1.default.find({ "grad": grad, "naziv": naziv, "adresa": adresa, "PIB": PIB }, (err, agencije) => {
        if (err)
            console.log(err);
        else
            res.json(agencije);
    });
});
router.route('/dohvatiAgencijePoGradu').post((req, res) => {
    let grad = req.body.grad;
    agencija_1.default.find({ "grad": grad }, (err, agencije) => {
        if (err)
            console.log(err);
        else
            res.json(agencije);
    });
});
router.route('/dohvatiAgencijuPoImenu').post((req, res) => {
    let naziv = req.body.naziv;
    agencija_1.default.findOne({ "naziv": naziv }, (err, agencija) => {
        if (err)
            console.log(err);
        else
            res.json(agencija);
    });
});
router.route('/dodajAgenciju').post((req, res) => {
    let a = new agencija_1.default({
        naziv: req.body.agencija.naziv,
        adresa: req.body.agencija.adresa,
        grad: req.body.agencija.grad,
        telefon: req.body.agencija.telefon,
        PIB: req.body.agencija.PIB
    });
    a.save().then(agencija => {
        res.status(200).json({ 'poruka': 'Agencija dodata' });
    }).catch(err => {
        res.status(400).json({ 'poruka': 'greska' });
    });
});
// Registracija 
app.post('/registracija', upload.single('slika'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    let tmp = JSON.parse(req.body.korisnik);
    let k = new korisnik_1.default({
        ime: tmp.ime,
        prezime: tmp.prezime,
        kor_ime: tmp.kor_ime,
        lozinka: tmp.lozinka,
        grad: tmp.grad,
        datum_rodjenja: tmp.datum_rodjenja,
        telefon: tmp.telefon,
        mejl: tmp.mejl,
        tip: tmp.tip,
        agencija: tmp.agencija,
        br_licence: tmp.br_licence,
        odobren: tmp.odobren,
    });
    k.save().then(korisnik => {
        res.status(200).json({ 'message': 'korisnik dodat' });
    }).catch(err => {
        res.status(400).json({ 'message': 'greska' });
    });
});
// Prijava
router.route('/prijava').post((req, res) => {
    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;
    korisnik_1.default.findOne({ "kor_ime": kor_ime, "lozinka": lozinka }, (err, korisnik) => {
        if (err)
            console.log(err);
        else
            res.json(korisnik);
    });
});
// Korisnici
router.route('/dohvatiKorisnika').post((req, res) => {
    let kor_ime = req.body.kor_ime;
    korisnik_1.default.findOne({ "kor_ime": kor_ime }, (err, korisnik) => {
        if (err)
            console.log(err);
        else
            res.json(korisnik);
    });
});
router.route('/dohvatiKorisnikaPoImenuIPrezimenu').post((req, res) => {
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    korisnik_1.default.findOne({ "ime": ime, "prezime": prezime }, (err, korisnik) => {
        if (err)
            console.log(err);
        else
            res.json(korisnik);
    });
});
router.route('/dohvatiOdobreneKorisnike').get((req, res) => {
    korisnik_1.default.find({ "odobren": 1 }, (err, korisnici) => {
        if (err)
            console.log(err);
        else
            res.json(korisnici);
    });
});
router.route('/dohvatiOdbijeneKorisnike').get((req, res) => {
    korisnik_1.default.find({ "odobren": -1 }, (err, korisnici) => {
        if (err)
            console.log(err);
        else
            res.json(korisnici);
    });
});
router.route('/dohvatiKorisnikeNaCekanju').get((req, res) => {
    korisnik_1.default.find({ "odobren": 0 }, (err, korisnici) => {
        if (err)
            console.log(err);
        else
            res.json(korisnici);
    });
});
router.route('/odobri').post((req, res) => {
    let kor_ime = req.body.kor_ime;
    korisnik_1.default.collection.updateOne({ "kor_ime": kor_ime }, { $set: { "odobren": 1 } });
    res.json({ poruka: "ok" });
});
router.route('/odbij').post((req, res) => {
    let kor_ime = req.body.kor_ime;
    korisnik_1.default.collection.updateOne({ "kor_ime": kor_ime }, { $set: { "odobren": -1 } });
    res.json({ poruka: "ok" });
});
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map