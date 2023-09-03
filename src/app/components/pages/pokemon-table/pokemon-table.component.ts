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
  allPokemons: any[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  visiblePages: number = 10;


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
        this.allPokemons = data.results;
        this.totalPages = Math.ceil(this.allPokemons.length / this.limit);
        this.applyFilterAndSearch(this.filterValue);
  
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
      this.filteredPokemons = this.allPokemons.filter(pok => {
        const nameLower = pok.name.toLocaleLowerCase();
        return nameLower.includes(searchText);
      });
    }
  }

  setFilterAndSearch(searchText: string) {
    this.filterValue = searchText;
    this.applyFilterAndSearch(searchText);
  }

  generatePages(): number[] {
    let startPage: number;
    let endPage: number;
  
    if (this.totalPages <= this.visiblePages) {
      startPage = 1;
      endPage = this.totalPages;
    } else {
      let middle = Math.ceil(this.visiblePages / 2);
  
      if (this.currentPage <= middle) {
        startPage = 1;
        endPage = this.visiblePages;
      } else if (this.currentPage + middle >= this.totalPages) {
        startPage = this.totalPages - this.visiblePages + 1;
        endPage = this.totalPages;
      } else {
        startPage = this.currentPage - middle + 1;
        endPage = this.currentPage + middle - 1;
      }
    }
  
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  changePage(offset: number): void {
    this.offset = offset;
    this.loadPokemons();
  }
  
  changePageTo(page: number): void {
    this.currentPage = page;
    this.changePage((page - 1) * this.limit);
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.changePageTo(this.currentPage + 1);
    }
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.changePageTo(this.currentPage - 1);
    }
  }
  
  isPageActive(page: number): boolean {
    return this.offset / this.limit + 1 === page;
  }
}