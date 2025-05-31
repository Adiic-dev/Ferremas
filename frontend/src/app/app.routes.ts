import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Registro } from '../pages/registro/registro';
import { Crud } from '../pages/crud/crud';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Home es la página principal
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'crud', component: Crud },

];