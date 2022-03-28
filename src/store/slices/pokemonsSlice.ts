import { createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "../../interfaces/IPokemon";

export type PokemonsState = {
    pokemons: Pokemon[];
    loading: boolean;
}

const initialState: PokemonsState = {
    pokemons: [],
    loading: false,
};

const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        getPokemonsFetch(state) {
            state.loading = true;
        },
        savePokemons(state:PokemonsState, { payload }) {
            state.pokemons = [...state.pokemons, ...payload];
        }
    }
});

export const { getPokemonsFetch, savePokemons } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;