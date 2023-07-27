import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  selectedPokemon: any;


  constructor(private pokeService: PokemonService) {}




  ngOnInit(): void {
    this.pokeService.selectedPokemon$.subscribe((pokemon: any) => {
      this.selectedPokemon = pokemon;
    });
 
  }


  getPokemonColorClass(type: string): string {
    switch (type.toLowerCase()) {
      case 'steel':
        return 'bg-[#A8A8C0]';
      case 'water':
        return 'bg-[#3899F8]';
      case 'bug':
        return 'bg-[#A8B820]';
      case 'dragon':
        return 'bg-[#7860E0]';
      case 'electric':
        return 'bg-[#F8D030]';
      case 'ghost':
        return 'bg-[#6060B0]';
      case 'fire':
        return 'bg-[#F05030]';
      case 'fairy':
        return 'bg-[#E79FE7]';
      case 'ice':
        return 'bg-[#58C8E0]';
      case 'fighting':
        return 'bg-[#A05038]';
      case 'normal':
        return 'bg-[#A8A090]';
      case 'grass':
        return 'bg-[#78C850]';
      case 'psychic':
        return 'bg-[#F870A0]';
      case 'rock':
        return 'bg-[#B8A058]';
      case 'dark':
        return 'bg-[#7A5848]';
      case 'ground':
        return 'bg-[#E9D6A4]';
      case 'poison':
        return 'bg-[#B058A0]';
      case 'flying':
        return 'bg-[#98A8F0]';
      default:
        return 'bg-gray-100';
    }
  }
  
  getPokemonTypeClass(type: string): string {
    switch (type.toLowerCase()) {
      case 'steel':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'water':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'bug':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'dragon':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'electric':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'ghost':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'fire':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'fairy':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
      case 'ice':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300';
      case 'fighting':
        return 'bg-brown-100 text-brown-800 dark:bg-brown-900 dark:text-brown-300';
      case 'normal':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'grass':
        return 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'psychic':
        return 'bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'rock':
        return 'bg-yellow-400 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'dark':
        return 'bg-indigo-400 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'ground':
        return 'bg-brown-200 text-brown-800 dark:bg-brown-900 dark:text-brown-300';
      case 'poison':
        return 'bg-purple-300 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'flying':
        return 'bg-cyan-200 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  }


}
