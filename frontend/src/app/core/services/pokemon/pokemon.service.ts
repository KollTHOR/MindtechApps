import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private httpClient = inject(HttpClient);

  getPokemons(): Observable<any> {
    return this.httpClient.get<any>(`${environment.pokeApiUrl}/pokemon`);
  }

  getPokemonTypes(): Observable<any> {
    const resp = this.httpClient.get<any>(`${environment.pokeApiUrl}/type`);
    return resp;
  }

  getPokemonsByType(typeUrl: string): Observable<any> {
    return this.httpClient.get<any>(typeUrl);
  }
}
