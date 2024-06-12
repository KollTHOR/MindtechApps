import { Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PokemonListComponent } from './components/pokemon/list/list.component';
import { PokemonDetailsComponent } from './components/pokemon/details/details.component';
import { loginAuthGuard } from './core/guards/login-auth/login-auth.guard';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'pokemons',
    component: PokemonListComponent,
    canActivate: [loginAuthGuard],
  },
  {
    path: 'pokemon/:id',
    component: PokemonDetailsComponent,
    canActivate: [loginAuthGuard],
  },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
];
