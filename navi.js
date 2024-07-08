import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import login from "./login";
import register from "./App";
import search from "./seach";

const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="login" component={login} />
       <Stack.Screen name="register" component={register} />
       <Stack.Screen name="Search" component={search} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}