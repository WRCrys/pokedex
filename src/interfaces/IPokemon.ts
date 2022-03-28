export interface Pokemon {
    name: string;
    url: string;
    id: number;
    types: PokemonType[];
    species: {
        name: string;
    },
    height: number;
    moves: MovesBattle[];
}

export type PokemonType = {
    type: {
        name: string;
    }
}

export interface MovesBattle {
    move: {
        name: string;
    }
}