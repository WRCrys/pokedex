import { createSlice } from "@reduxjs/toolkit";

export interface type {
    name: string;
}

export interface TypeState {
    types: type[]
};

const initialState: TypeState = {
    types: [],
};

const typesSlice = createSlice({
    name: 'types',
    initialState,
    reducers: {
        setTypesForSearch(state: TypeState, { payload }) {
            return { ...state, types: payload };
        },
        removeType(state, { payload }) {
            const arr = state.types.filter(a => a.name !== payload);

            return { ...state, types: arr };
        },
        removeAllFilters(state) {
            return { ...state, types: [] }
        }
    }
});

export const { setTypesForSearch, removeAllFilters, removeType } = typesSlice.actions;

export default typesSlice.reducer;