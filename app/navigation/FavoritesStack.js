import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Favorites from '../screens/Favorites';
const Stack = createStackNavigator();
export default function FavoritesStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle:{backgroundColor: '#FF5A60'}
            }}
        >
            <Stack.Screen
                name="favoriteStack"
                component={ Favorites }
                options={{ title: "Favoritos" }}
            />
        </Stack.Navigator>
    )
}

