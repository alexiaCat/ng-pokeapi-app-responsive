import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private selectedPokemonSubject = new BehaviorSubject<any>(null);
  selectedPokemon$: Observable<any> = this.selectedPokemonSubject.asObservable();
  pokemons: any[] = [];
  private filteredPokemonsSubject = new BehaviorSubject<any[]>([]);
  filteredPokemons$: Observable<any[]> = this.filteredPokemonsSubject.asObservable();
  favoritePokemon: any | null = null;

  constructor(private http: HttpClient) {

  }

  getPokemons(offset: number, limit: number) {
    const url = `${this.baseUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<any>(url);
  }


  getAllPokemons(){
    const url = `${this.baseUrl}?limit=2500`;
    return this.http.get<any>(url);
  }


  setSelectedPokemon(pokemon: any): void {
    this.selectedPokemonSubject.next(pokemon);
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
  
  setFavoritePokemon(pokemon: any) {
    this.favoritePokemon = pokemon;
  }

  getFavoritePokemon(): any | null {
    return this.favoritePokemon;
  }

  toggleFavoritePokemon(pokemon: any) {
    if (this.favoritePokemon === pokemon) {
      this.favoritePokemon = null; 
    } else {
      this.favoritePokemon = pokemon; 
    }
  }

}