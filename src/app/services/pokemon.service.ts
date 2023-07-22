import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemons: any[] = [];

  constructor(private http: HttpClient) {
    this.loadPokemons();
  }

  private loadPokemons() {
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=16')
      .subscribe(
        (res: any) => {
          const results = res.results;
          for (const result of results) {
            this.http.get<any>(result.url)
              .subscribe(
                (pokemonData: any) => {
                  this.pokemons.push({
                    name: pokemonData.name,
                    image: pokemonData.sprites.front_default
                  });
                },
                (error: any) => {
                  console.error('Error al cargar los detalles del Pokemon:', error);
                }
              );
          }
        },
        (error: any) => {
          console.error('Error al cargar los Pokemons:', error);
        }
      );
  }


  
}
