import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faDotCircle} from '@fortawesome/free-regular-svg-icons';
import { EventEmitter }from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit{
  tiles: string[] = new Array(9).fill('untouched');
  moves: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  turn = 'crossed';
  winner = '';
  isGameOver = false;

  @Output() restartGame: EventEmitter<any> = new EventEmitter<string>();
  @Output() winning: EventEmitter<string> = new EventEmitter<string>();

  constructor(private changeRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.restartGame.emit(() => this.restart());
  }

  restart(){
    this.turn = this.winner || 'crossed';
    this.winner = '';
    this.isGameOver = false;
    for (let i = 0; i < 9; i++){
      this.tiles[i] = 'untouched';
      this.moves[i] = i;
    }
  }


  move(index: number): void{
    if (this.moves.indexOf(index) > -1) {
      this.moves.splice(this.moves.indexOf(index), 1);
    }

    if (this.isGameOver) {
      return;
    }

    if ( this.tiles[index] === 'untouched' ) {
      this.tiles[index] = this.turn;
    }
    else {
      return;
    }

    if ( this.turn === 'crossed'){
      this.turn = 'circle';
      setTimeout(() => {
        this.boat();
      }, 300);
    }else{
      this.turn = 'crossed';
    }

    this.checkWinner();

    if (this.winner && !this.isGameOver){
      this.isGameOver = true;
      this.winning.emit(this.winner);
    }
  }

  checkWinner(){
    if (this.winner) {
      return;
    }
    for (let i = 0; i < 3; i++) {
      if (
        (this.tiles[i] === this.tiles[i + 3]) &&
        (this.tiles[i] === this.tiles[i + 6]) &&
        (this.tiles[i] !== 'untouched')
      ) {
        this.winner = this.tiles[i];
      }
    }

    for (let i = 0; i < 7; i = i + 3) {
      if (
        (this.tiles[i] === this.tiles[i + 1]) &&
        (this.tiles[i] === this.tiles[i + 2]) &&
        (this.tiles[i] !== 'untouched')
      ) {
        this.winner = this.tiles[i];
      }
    }

    if (
      (this.tiles[0] === this.tiles[4]) &&
      (this.tiles[0] === this.tiles[8]) &&
      (this.tiles[0] !== 'untouched')
    ) {
      this.winner = this.tiles[0];
    }

    if (
      (this.tiles[2] === this.tiles[4]) &&
      (this.tiles[4] === this.tiles[6]) &&
      (this.tiles[2] !== 'untouched')
    ) {
      this.winner = this.tiles[2];
    }
  }

  icon(index: number){
    if (this.tiles[index] === 'crossed'){
      return faTimes;
    }else if (this.tiles[index] === 'circle'){
      return faCircle;
    }else{
      return faDotCircle;
    }
  }

  boat(){
    const randomNumber = Math.floor(Math.random() * this.moves.length);

    this.move(this.moves[randomNumber]);
  }

}
