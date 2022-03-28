import { call, put, takeEvery } from 'redux-saga/effects';
import { MovesBattle, Pokemon, PokemonType } from '../../interfaces/IPokemon';
import { pokeApi } from '../../services/api';
import { savePokemons } from '../slices/pokemonsSlice';

interface Request {
    id: number;
    types: PokemonType[];
    species: {
        name: string;
    },
    height: number;
    moves: MovesBattle[];
}

async function getMoreInfoAboutPokemonsByUrl(url: string): Promise<Request> {
    const response = await pokeApi.get(url);

    const { id, types, species, height, moves } = response.data as Request;

    return { id, types, species, height, moves };


}

function* workGetPokemonsFetch() {
    const request: Pokemon[] = yield call(async () => {
        const response = await pokeApi.get('/pokemon/?offset=0&limit=20');
                const { results } = response.data;

                const payloadPokemons = await Promise.all(
                    results.map(async (pokemon: Pokemon) => {
                        const { id, types, species, height, moves } = await getMoreInfoAboutPokemonsByUrl(pokemon.url);

                        return {
                            name: pokemon.name,
                            id,
                            types,
                            species,
                            height,
                            moves,
                        }
                    })
                );

                return payloadPokemons as Pokemon[];
    });
    // yield put(savePokemons(request));
    console.log(request);
}

function* pokemonsSaga() {
    yield takeEvery('pokemons/getPokemonsFetch', workGetPokemonsFetch);
}

export default pokemonsSaga;