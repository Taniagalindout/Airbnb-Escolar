import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Search from '../screens/Search'
const Stack = createStackNavigator();

export default function SearchStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle:{backgroundColor: '#FF5A60'}
            }}
        >
            <Stack.Screen
                name="searchStack"
                component={ Search }
                options={{ title: "Buscar" }}
            />
        </Stack.Navigator>
    )
}