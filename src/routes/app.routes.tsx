import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import { DrawerFilter } from '../components/DrawerFilter';
import { About } from '../pages/About';
import Dashboard from "../pages/Dashboard";

export type AppStackParams = {
    Dashboard: any;
    About: any;

}

const AppStack = createDrawerNavigator<AppStackParams>();

const AppRoutes: React.FC = () => (
    <AppStack.Navigator 
        initialRouteName='Dashboard'
        drawerContent={(props) => <DrawerFilter {...props} />}
        screenOptions={{
            drawerPosition: 'right',            
            drawerStyle : { width: '82%'}  
        }}
    >
        <AppStack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
                headerShown: false,             
            }}
        />

        <AppStack.Screen
            name="About"
            component={About}
            options={{
                headerShown: false,
            }}
        />
    </AppStack.Navigator>
);

export default AppRoutes;