import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.css']
})
export class PokemonTableComponent implements OnInit {
  pokemons: any[] = [];
  offset = 0;
  limit = 20;
  filterValue = '';
  filteredPokemons: any[] = [];

  constructor(private pokeService: PokemonService) { }

  ngOnInit() {
    this.loadPokemons();
    this.setFilterAndSearch(this.filterValue); 
  }

  loadPokemons() {
    this.pokeService.getPokemons(this.offset, this.limit)
      .subscribe((data: any) => {
        this.pokemons = data.results;
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
    .subscribe((detail: any) =>{
      this.pokeService.setFavoritePokemon(detail);
      console.log(detail)
    })

    this.pokemons.forEach((p: any) => (p.isFavorite = false));
    pokemon.isFavorite = true;
  }

  setFilterAndSearch(searchText: string) {
    this.filterValue = searchText; 
    console.log(this.filterValue);
    this.pokeService.setFilterAndSearch(searchText);
  }

}
