import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../../core/models/pokemon.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  totalPokemons: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
}
