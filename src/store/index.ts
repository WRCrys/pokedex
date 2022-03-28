import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import pokemonsSlice from "./slices/pokemonsSlice";
import typesSlice from "./slices/typesSlice";
import createSagaMiddleware from 'redux-saga';

const rootReducer = combineReducers({
    pokemons: pokemonsSlice,
    typesOfPokemos: typesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const saga = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});

export default store;