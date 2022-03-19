export type Players = 'circle' | 'cross';
export type Position = [number, number];
export type State = (Players | '')[][];
export type Score = -1 | 0 | 1;
export type Result = Players | null | 'tie';