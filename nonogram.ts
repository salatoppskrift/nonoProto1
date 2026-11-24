type NonogramProto = boolean[][];

type Five = 5;

type NonoSquare = {
    id: string,
    filled: boolean,
    location: NonoCoordinate
};
type NonoCoordinate = {
    x: number,
    y: number
}
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
    private _konstant: Five;
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
    get FasitAsOnesAndZeros(): number[][] {
        return this._getAsNumbers(this._fasit);
        // heller ha suksessmelding/errormelding istedenfor å motta et direkte number[][]!
    }
    get UserAsOnesAndZeros(): number[][] {
        return this._getAsNumbers(this._user);
    }

    set nyFasit(nonogram: Nonogram) {
        this._fasit = nonogram;
    }

    static get defaultFiveByFiveNonogramProtype(): Nonogram {
        return this.createNewNonogram([
            [false, false, false, true, false],
            [false, true, true, true, true],
            [false, true, true, true, false],
            [true, true, true, false, false],
            [true, true, false, false, false]
        ]);
    }

    static createNewNonogram(boolArr: NonogramProto): Nonogram {
        return boolArr.map((row, rI) => row.map((boo, bI) => ({
            id: 'string',
            filled: boo,
            location: { x: rI, y: bI }
        }) satisfies NonoSquare));
    }

    private _getAsNumbers(arr: Nonogram): number[][] {
        return arr.map(row => row.map(boo => Number(Boolean(boo?.filled))));
    }
}

const nono = new NonogramBoard();
nono.nyFasit = NonogramBoard.defaultFiveByFiveNonogramProtype;

console.log(nono.FasitAsOnesAndZeros);
console.log(nono.UserAsOnesAndZeros);
console.log("Ønsker meg...", [
    [0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0]
])
//console.log(nono.User.map(row => row.map(boo => Number(boo === null ? boo : boo.filled))));
