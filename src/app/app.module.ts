import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { AddZeroPipe } from './pipes/add-zero.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    AddZeroPipe,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
