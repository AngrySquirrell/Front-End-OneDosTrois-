export interface GameData {
    players: Player[];
    isFull: boolean;
    activeCard: Card;
    turn: number;
    deck: Card[];
    enemyDeck: number;
}

export interface Player {
    name: string;
    deck: Card[];
    Uno: boolean;
    uuid: string;
}

export interface Card {
    color: color;
    value: value;
    type: type;
}

export type color = "yellow" | "red" | "green" | "blue" | "wild";
export type value = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | -1;
export type type = "number" | "skip" | "reverse" | "draw2" | "wild" | "wild4";
