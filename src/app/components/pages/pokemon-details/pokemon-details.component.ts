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


}
