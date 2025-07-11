
import { Routes } from '@angular/router';

import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Registro } from '../pages/registro/registro';
import { Crud } from '../pages/crud/crud';

import { CarritoComponent } from '../pages/carrito/carrito';
import { AuthGuard } from './auth-guard';
import { NoAuthGuard } from './no-auth-guard-guard';





export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, canActivate: [AuthGuard]},
  { path: 'login', component: Login, canActivate: [NoAuthGuard] },
  { path: 'registro', component: Registro, canActivate: [NoAuthGuard] },
  { path: 'crud', component: Crud, canActivate: [AuthGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] },
];