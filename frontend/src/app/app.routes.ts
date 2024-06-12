import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { PokemonListComponent } from './pokemon/list/list.component';
import { PokemonDetailsComponent } from './pokemon/details/details.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pokemons', component: PokemonListComponent },
  { path: 'pokemon/:id', component: PokemonDetailsComponent },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
];
