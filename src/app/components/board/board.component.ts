import { Component, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons';
import { EventEmitter } from '@angular/core';
import { Players, Result, State } from 'src/app/models/game.interface';
import { bot } from 'src/app/util/bot';
import { result } from 'src/app/util/checkResult';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  tiles: State = Array.from(Array(3), () => new Array(3).fill(''));
  turn: Players = 'cross';
  faDotCircle = faDotCircle;

  @Output() restartGame: EventEmitter<any> = new EventEmitter<string>();
  @Output() winning: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    let [i, j] = bot(this.tiles);
    this.tiles[i][j] = 'circle';
    this.restartGame.emit(this.restart.bind(this));
  }

  private checkWinner(): Result {
    return result(this.tiles);
  }

  restart() {
    this.tiles = Array.from(Array(3), () => new Array(3).fill(''));
  }


  move(i: number, j: number): void {
    let result = this.checkWinner();

    if (result)
      return;

    if (this.tiles[i][j] === '')
      this.tiles[i][j] = this.turn;
    else
      return;


    if (this.turn === 'cross') {
      this.turn = 'circle';
      let [i, j] = bot(this.tiles);
      this.tiles[i][j] = this.turn;
      this.turn = 'cross';
    }
  }

  icon(i: number, j: number) {
    if (this.tiles[i][j] === 'cross') {
      return faTimes;
    } else if (this.tiles[i][j] === 'circle') {
      return faCircle;
    }
    return faDotCircle;
  }
}
