type Players = 'cross' | 'circle';
type Position = [number, number];
type State = (Players | '')[][];
type Score = -1 | 0 | 1;

function bot(state: State): Position {
    let possibleMove = possibleMoves(state);
    let move = minmax(state, false, possibleMove).position;
    return <Position>move;
};

function minmax(state: State, min: boolean, possibleMoves: Position[]): { score: Score, position: Position } {
    let winner: Players | 'tie' | null;
    let position: Position;
    let score: Score;
    let bestPossibleResult: number = min ? 100 : -100;
    let remainingMoves: Position[];
    let player: Players = min ? 'cross' : 'circle';

    for (let [index, [i, j]] of possibleMoves.entries()) {
        state[i][j] = player
        winner = checkWinner(state);
        remainingMoves = possibleMoves.slice(0, index).concat(possibleMoves.slice(index + 1));


        switch (winner) {
            case 'cross':
                score = -1;
                break;
            case 'circle':
                score = 1;
                break;
            case 'tie':
                score = 0;
                break;
            default:
                score = minmax(state, !min, remainingMoves).score;
                break;
        }

        if (player === "cross") {
            if (bestPossibleResult! === -1) {
                score = -1
                position = [i, j];
                state[i][j] = '';
                return { score, position };
            }

            if (bestPossibleResult > score!) {
                bestPossibleResult = score!;
                position = [i, j];
            }
        } else {
            if (bestPossibleResult! === 1) {
                score = 1
                position = [i, j];
                state[i][j] = '';
                return { score, position };
            }

            if (bestPossibleResult < score!) {
                bestPossibleResult = score!;
                position = [i, j];
            }
        }
        state[i][j] = '';
    }
    return { score: score!, position: position! };
}





function possibleMoves(state: (Players | '')[][]): [i: number, j: number][] {
    let possibleMoves = [];

    for (let i = 0; i < state.length; i++)
        for (let j = 0; j < state[i].length; j++)
            if (state[i][j] === '')
                possibleMoves.push([i, j]);

    return <[number, number][]>possibleMoves;
}


function checkWinner(state: (Players | '')[][]): Players | 'tie' | null {
    const t = state;

    for (let i = 0; i < 3; i++)
        if (t[i][0] === t[i][1] && t[i][0] === t[i][2] && t[i][0] !== '')
            return <Players>t[i][0];

    for (let i = 0; i < 3; i++)
        if (t[0][i] === t[1][i] && t[0][i] === t[2][i] && t[0][i] !== '')
            return <Players>t[0][i];

    if (t[0][0] === t[1][1] && t[0][0] === t[2][2] && t[0][0] !== '')
        return <Players>t[0][0];

    if (t[2][0] === t[1][1] && t[2][0] === t[0][2] && t[2][0] !== '')
        return <Players>t[2][0];

    if (possibleMoves(state).length === 0) {
        return 'tie';
    }

    return null;
}
bot([['cross', 'cross', 'circle'], ['circle', 'cross', 'cross'], ['', '', 'circle']]);