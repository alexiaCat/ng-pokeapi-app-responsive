import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';


import { PokemonTableComponent } from './components/pages/pokemon-table/pokemon-table.component';
import { PokemonDetailsComponent } from './components/pages/pokemon-details/pokemon-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PokemonTableComponent,
    PokemonDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
