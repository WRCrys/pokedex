import AsyncStorage from "@react-native-community/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { getUser } from "../services/auth";

interface User {
    id: string;
    user: string;
    email: string;
    password: string;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn(email: string, password: string): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@pokedex:user');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
            }
        }

        loadStorageData();
    }, []);

    async function signIn(email: string, password: string) {
        setLoading(true);
        const response = await getUser(email, password);

        if (response) {            
            setUser(response);
            await AsyncStorage.setItem('@pokedex:user', JSON.stringify(response));
        }

        setLoading(false);

    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    return <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
        {children}
    </AuthContext.Provider>

}

export default AuthContext;