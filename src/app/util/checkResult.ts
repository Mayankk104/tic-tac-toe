import { Players, Position, Result } from "../models/game.interface";

export function possibleMoves(state: (Players | '')[][]): [i: number, j: number][] {
    let possibleMoves = [];

    for (let i = 0; i < state.length; i++)
        for (let j = 0; j < state[i].length; j++)
            if (state[i][j] === '')
                possibleMoves.push([i, j]);

    return <Position[]>possibleMoves;
}

export function result(state: (Players | '')[][]): Result {
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

    if (possibleMoves(state).length === 0)
        return 'tie';

    return null;
}