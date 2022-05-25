import { Position, Players, State, Score } from '../models/game.interface';
import { possibleMoves, result } from './checkResult';

export function bot(state: State): Position {
    let moves = possibleMoves(state);
    let move = minimax(state, 'circle', moves);
    return move.position;
};

function minimax(state: State, player: Players, possible_moves: Position[]): { score: Score, position: Position } {
    let score: Score;
    let position: Position;
    let bestScore = player === 'circle' ? -100 : 100;

    for (let [i, j] of possible_moves) {
        state[i][j] = player;

        switch (result(state)) {
            case 'circle':
                score = 1;
                break;
            case 'cross':
                score = -1;
                break;
            case 'tie':
                score = 0;
                break;
            default:
                let remainingMoves = possibleMoves(state);
                score = minimax(state, player === 'circle' ? 'cross' : 'circle', remainingMoves).score;
                break;
        }

        state[i][j] = '';

        if (player === 'cross') {
            if (score === -1)
                return { score, position: [i, j] };

            if (score < bestScore) {
                bestScore = score;
                position = [i, j];
            }
        } else {
            if (score === 1)
                return { score, position: [i, j] };

            if (score > bestScore) {
                bestScore = score;
                position = [i, j];
            }
        }
    }
    return { score: <Score>bestScore, position: position! };
}

