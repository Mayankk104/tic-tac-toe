import { Component } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tic-tac-toev2';
  message = '';
  facircle = faCircle;
  fatimes = faTimes;

  crossScore = 0;
  circleScore = 0;


  updateScore(winner: string) {
    if (winner === 'cross')
      this.crossScore++;
    else
      this.circleScore++;
  }

  restartMatch() { }

  restartGame() {
    this.restartMatch();
    this.crossScore = 0;
    this.circleScore = 0;
  }

  reset(fu: any) {
    console.log(fu);
    this.restartMatch = fu;
  }
}
