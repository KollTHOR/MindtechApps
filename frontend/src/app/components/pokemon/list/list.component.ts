import { Component, OnInit, inject } from '@angular/core';
import { Pokemon } from '../../../core/models/pokemon.model';
import { PokemonService } from '../../../core/services/pokemon/pokemon.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatSelectModule,
    FormsModule,
    MatOptionModule,
    CommonModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  caughtPokemons: Pokemon[] = [];
  totalPokemons: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  pokemonTypes: { name: string; url: string }[] = [];
  selectedTypeUrl: string = '';

  private pokemonService = inject(PokemonService);

  ngOnInit() {
    this.getPokemonTypes();
  }

  getPokemonTypes() {
    this.pokemonService.getPokemonTypes().subscribe((types) => {
      this.pokemonTypes = types.results;
    });
  }

  onTypeChange() {
    if (this.selectedTypeUrl) {
      this.getPokemonsByType(this.selectedTypeUrl);
    }
  }

  getPokemonsByType(typeUrl: string) {
    this.pokemonService.getPokemonsByType(typeUrl).subscribe((response) => {
      this.pokemons = response.pokemon.map((item: any) => item.pokemon);
    });
  }

  getPokemonId(pokemonUrl: string): number {
    const parts = pokemonUrl.split('/');
    return parseInt(parts[parts.length - 2]);
  }
}
