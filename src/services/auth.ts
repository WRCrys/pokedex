import { AxiosError } from 'axios';
import { api } from './api';

interface userResponse {
    id: string,
        user: string,
        email: string,
        password: string,
}

export async function getUser(email: string, password: string): Promise<userResponse> {
    return new Promise((resolve, reject) => {
        api.get(`users?email=${email}&password=${password}`)
        .then(({data}) => {
            resolve(data[0]);
        })
        .catch((error: AxiosError<string>) => reject(error));
    })
}