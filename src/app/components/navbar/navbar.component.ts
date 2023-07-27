import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDialogComponent } from '../pages/pokemon-dialog/pokemon-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public pokemonService: PokemonService, public dialog: MatDialog) {
  }

  openPokemonDialog(data: any) {
    this.dialog.open(PokemonDialogComponent, {
      data: data,
    });
  }
}
