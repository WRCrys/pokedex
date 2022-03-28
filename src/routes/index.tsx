import React from "react";
import { Text, View } from "react-native";
import { useAuth } from "../hooks/useAuth";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

const Routes = () => {

    const { signed } = useAuth();

    return signed ? <AppRoutes /> : <AuthRoutes />
}

export default Routes;