import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from "../screens/Profile";
import UserGuest from '../screens/profile/UserGuest';
import UserLogged from '../screens/profile/UserLogged';
import UserLogin from '../screens/profile/UserLogin';
import CreateAccount from '../screens/CreateAccount';
import CreateAccountForms from '../../components/profile/CreateAccountForms';
const Stack = createStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#FF5A60' }
            }}>
            <Stack.Screen
                name="profileStack"
                component={Profile}
                options={{ title: "Perfil" }}
            />
            <Stack.Screen
                name="userGuest"
                component={UserGuest}
                options={{ title: "Invitado" }}
            />
            <Stack.Screen
                name="userLogged"
                component={UserLogged}
                options={{ title: "Perfil de usuario" }}
            />
            <Stack.Screen
                name="userLogin"
                component={UserLogin}
                options={{ title: "Inicio de sesión" }}
            />
            <Stack.Screen
                name="createAccount"
                component={CreateAccount}
                options={{ title: "Cuenta" }}
            />

        </Stack.Navigator>

    )
}

