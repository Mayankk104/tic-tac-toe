import { Component, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons';
import { EventEmitter } from '@angular/core';
import { Players } from 'src/app/models/game.interface';
import { boat } from 'src/app/util/boat';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  tiles: (Players | '')[][] = Array.from(Array(3), () => new Array(3).fill(''));
  turn: Players = 'cross';
  faDotCircle = faDotCircle;
  tempTiles: any[][] = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

  @Output() restartGame: EventEmitter<any> = new EventEmitter<string>();
  @Output() winning: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  private checkWinner(): Players | null {
    const t = this.tiles;

    // vertical checks
    for (let i = 0; i < 3; i++)
      if (t[i][0] === t[i][1] && t[i][0] === t[i][2] && t[i][0] !== '')
        return <Players>t[i][0];

    // horizontal checks
    for (let i = 0; i < 3; i++)
      if (t[0][i] === t[1][i] && t[0][i] === t[2][i] && t[0][i] !== '')
        return <Players>t[0][i];


    // dignal checks
    if (t[0][0] === t[1][1] && t[0][0] === t[2][2] && t[0][0] !== '')
      return <Players>t[0][0];

    if (t[2][0] === t[1][1] && t[2][0] === t[0][2] && t[2][0] !== '')
      return <Players>t[2][0];

    return null;
  }

  // restart() {
  //   this.turn = this.winner || 'crossed';
  //   this.winner = '';
  //   this.isGameOver = false;
  //   for (let i = 0; i < 9; i++) {
  //     this.tiles[i] = 'untouched';
  //     this.moves[i] = i;
  //   }
  // }


  move(i: number, j: number): void {
    // console.log(i, j)
    // this.tempTiles[i][j] = null;
    // console.log(this.tempTiles);
    // if (this.moves.indexOf(index) > -1) {
    //   this.moves.splice(this.moves.indexOf(index), 1);
    // }

    // if (this.isGameOver) {
    //   return;
    // }

    if (this.tiles[i][j] === '') {
      this.tiles[i][j] = this.turn;
      this.turn = this.turn === 'circle' ? 'cross' : 'circle';
    }
    else {
      return;
    }

    if (this.turn === 'circle') {
      console.log(this.tiles)
      let [i, j] = boat(this.tiles);
      this.tiles[i][j] = this.turn;
      this.turn = 'cross';
    }
    // if (this.turn === 'crossed') {
    //   this.turn = 'circle';
    //   setTimeout(() => {
    //     this.boat();
    //   }, 300);
    // } else {
    //   this.turn = 'crossed';
    // }


    // if (this.winner && !this.isGameOver) {
    //   this.isGameOver = true;
    //   this.winning.emit(this.winner);
    // }
  }

  icon(i: number, j: number) {
    if (this.tiles[i][j] === 'cross') {
      return faTimes;
    } else if (this.tiles[i][j] === 'circle') {
      return faCircle;
    }
    return faDotCircle;
  }

  // boat() {
  //   const randomNumber = Math.floor(Math.random() * this.moves.length);

  //   this.move(this.moves[randomNumber]);
  // }

}
