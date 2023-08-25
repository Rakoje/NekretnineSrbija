import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { KupacComponent } from './kupac/kupac.component';
import { LoginComponent } from './login/login.component';
import { NekretninaComponent } from './nekretnina/nekretnina.component';
import { NovaAgencijaComponent } from './nova-agencija/nova-agencija.component';
import { NovaNekretninaComponent } from './nova-nekretnina/nova-nekretnina.component';
import { OglasivacComponent } from './oglasivac/oglasivac.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'registracija', component: RegisterComponent},
  {path:'kupac', component: KupacComponent},
  {path:'rezultati', component: PretragaComponent},
  {path:'nekretnina', component: NekretninaComponent},
  {path:'oglasivac', component: OglasivacComponent},
  {path:'nova_nekretnina', component: NovaNekretninaComponent},
  {path:'admin', component: AdminComponent},
  {path:'nova_agencija', component: NovaAgencijaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
