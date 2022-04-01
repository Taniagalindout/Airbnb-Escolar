import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Message  from '../screens/Message';
import TravelStack from './TravelStack';
import ProfileStack from './ProfileStack';
import FavoritesStack from './FavoritesStack';
import SearchStack from './SearchStack';
import MessageStack from './MessageStack';
import LoginForms from '../../components/profile/LoginForms';
import UserLogin from '../screens/profile/UserLogin';
import TopStack from './TopStack';
const Tab = createBottomTabNavigator();
export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='travel'
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color),
                    tabBarActiveTintColor: '#FF5A60',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false //Ocultrar cabecera
                })
                }>
                <Tab.Screen
                    name="search"
                    component={SearchStack}
                    options={{ title: "Search" }}

                />
                <Tab.Screen
                    name="favorites"
                    component={FavoritesStack}
                    options={{ title: "Favoritos" }} />
                <Tab.Screen
                    name="travel"
                    component={TravelStack}
                    options={{ title: "Viajes" }}
                />
                <Tab.Screen
                    name="message"
                    component={MessageStack}
                    options={{ title: "Mensajes" }}
                />
                <Tab.Screen
                    name="profile"
                    component={ProfileStack}
                    options={{ title: "Perfil" }}
                /> 
                <Tab.Screen
                name="top"
                component={TopStack}
                options={{ title: "Top 5" }}
            />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const screenOptions = (route, color) => {
    let iconName;
    switch (route.name) {
        case "search":
            iconName = "magnify"
            break
        case "travel":
            iconName = "wallet-travel"
            break;
        case "favorites":
            iconName = "heart-outline"
            break;
        case "message":
            iconName = "message-outline"
            break;
        case "profile":
            iconName = "account-outline"
            break;
        case "top":
        iconName = "star-circle"
        break;    
    }
    return (
        <Icon type="material-community" name={iconName} size={22} color={color}></Icon>
    )
}