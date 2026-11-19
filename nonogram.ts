type NonoSetup = {
    _fasit: Nonogram,
    _user: Nonogram,
    row: (i: number) => (board: Nonogram) => rowOrColumn,
    kolonne: (i: number) => (board: Nonogram) => rowOrColumn,
    time: number
}

type NonoSquare = {
    id: string,
    filled: boolean
};
type rowOrColumn = (NonoSquare | null)[];
type Nonogram = (NonoSquare | null)[][];

export class App {
    nonogram: NonogramBoard;
    constructor() {
        this.nonogram = new NonogramBoard();
    }
}

class NonogramBoard {
    private _fasit: Nonogram;
    private _user: Nonogram;
    row: (i: number) => (board: Nonogram) => rowOrColumn;
    kolonne: (i: number) => (board: Nonogram) => rowOrColumn;
    time: number;
    private _size: { width: number, height: number };
    private _konstant: number;
    private _assymetric: boolean;

    constructor(size: number = 1, assymetricSize?: number) {
        this._size = { width: size, height: assymetricSize ?? size };
        this._assymetric = assymetricSize ? assymetricSize > size : false;
        this._konstant = 5;
        this._fasit = Array.from({ length: (assymetricSize ?? size) * this._konstant }, () =>
            Array.from({ length: size }, () => null)
        ),
            this._user = Array.from({ length: (assymetricSize ?? size) * this._konstant }, () =>
                Array.from({ length: size * this._konstant }, () => null)
            ),
            this.time = 0,
            this.row = i => board => board[i],
            this.kolonne = i => board => {
                return board[i];
            }
    }

    get kind() {
        return `${this._size.width}x${this._size.height}`;
    }

    get title() {
        return (this._assymetric ? `Special` : this.kind) + " Nonograms";
    }

    get Fasit() {
        return this._fasit;
    }
    get User() {
        return this._user;
    }

    set nyFasit(nonogram: Nonogram) {
        this._fasit = nonogram;
    }

    static get defaultFiveByFiveNonogram(): Nonogram {
        return [
            [false, false, false, true, false],
            [false, true, true, true, true],
            [false, true, true, true, false],
            [true, true, true, false, false],
            [true, true, false, false, false]
        ].map(row => row.map(boo => ({
            id: 'string',
            filled: boo
        }) satisfies NonoSquare));
    }
}

const nono = new NonogramBoard();
nono.nyFasit = NonogramBoard.defaultFiveByFiveNonogram;

console.log(nono.Fasit.map(row => row.map(boo => Number(Boolean(boo?.filled)))));
console.log(nono.row(2)(nono.Fasit).map(boo => Number(boo === null ? boo : boo.filled)));
console.log("Ønsker meg...", [
    [0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0]
])
//console.log(nono.User.map(row => row.map(boo => Number(boo === null ? boo : boo.filled))));
/* --- konsollen!
[
  [ 0, 0, 0, 1, 0 ],
  [ 0, 1, 1, 1, 1 ],
  [ 0, 1, 1, 1, 0 ],
  [ 1, 1, 1, 0, 0 ],
  [ 1, 1, 0, 0, 0 ]
]
[ 0, 1, 1, 1, 0 ] //nono.row(2).nonoFasit jepp! index 2 === 3dje rad
Ønsker meg... [
  [ 0, 0, 0, 1, 1 ],
  [ 0, 1, 1, 1, 1 ],
  [ 0, 1, 1, 1, 0 ],
  [ 1, 1, 1, 0, 0 ],
  [ 0, 1, 0, 0, 0 ]
]
*/
