import axios from "axios";

export const api = axios.create({
    baseURL: "http://9880-170-150-206-147.ngrok.io/"
});

export const pokeApi = axios.create({
    baseURL: "https://pokeapi.co/api/v2/"
})