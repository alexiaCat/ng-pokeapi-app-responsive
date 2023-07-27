import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.css']
})
export class PokemonTableComponent implements OnInit, OnDestroy {
  pokemons: any[] = [];
  offset = 0;
  limit = 20;
  filterValue = '';
  filteredPokemons: any[] = [];
  sortedResults: any[] = [];


  private filteredPokemonsSubscription: Subscription | undefined;

  constructor(private pokeService: PokemonService) { }


  ngOnInit() {
    this.filteredPokemonsSubscription = this.pokeService.filteredPokemons$.subscribe((filteredPokemons: any[]) => {
      this.filteredPokemons = filteredPokemons;
    });

    this.loadPokemons();
    this.loadAllPokemons();
  }

  ngOnDestroy() {
    if (this.filteredPokemonsSubscription) {
      this.filteredPokemonsSubscription.unsubscribe();
    }
  }

  loadPokemons() {
    this.pokeService.getPokemons(this.offset, this.limit)
      .subscribe((data: any) => {
        this.pokemons = data.results;
        this.applyFilterAndSearch(this.filterValue);
      });
  }

  loadAllPokemons() {
    this.pokeService.getAllPokemons()
      .subscribe((data: any) => {
        const pokemonNames = data.results.map((pokemon: any) => pokemon.name);
  
        const countByLetter: {[letter: string]: number} = {};
        for (const name of pokemonNames) {
          const firstLetter = name.charAt(0).toUpperCase();
          if (/[A-Z]/.test(firstLetter)) { 
            countByLetter[firstLetter] = (countByLetter[firstLetter] || 0) + 1;
          }
        }
  
        this.sortedResults = Object.entries(countByLetter).sort((a, b) => a[0].localeCompare(b[0]));
      });
  }
  

  changePage(offset: number) {
    this.offset = offset;
    this.loadPokemons();
  }

  previousPage() {
    if (this.offset - this.limit >= 0) {
      this.changePage(this.offset - this.limit);
    }
  }

  onPokemonClicked(pokemon: any): void {
    this.pokeService.getPokemonDetails(pokemon.url)
      .subscribe((details: any) => {
        this.pokeService.setSelectedPokemon(details);
      });
  }

  toggleFavorite(pokemon: any) {
    this.pokeService.getPokemonDetails(pokemon.url)
      .subscribe((detail: any) => {
        this.pokeService.setFavoritePokemon(detail);
      });

    this.pokemons.forEach((p: any) => (p.isFavorite = false));
    pokemon.isFavorite = true;
  }


  applyFilterAndSearch(searchText: string) {
    searchText = searchText.toLocaleLowerCase();
    if (searchText === '') {
      this.filteredPokemons = this.pokemons;
    } else {
      this.filteredPokemons = this.pokemons.filter(pok => {
        const nameLower = pok.name.toLocaleLowerCase();
        return nameLower.includes(searchText);
      });
    }
  }

  setFilterAndSearch(searchText: string) {
    this.filterValue = searchText;
    this.applyFilterAndSearch(searchText);
  }
}