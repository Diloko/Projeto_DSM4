import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./pages/main";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Movie from "./pages/movie"; // 👈 novo import

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            title: "LOGIN",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#3498DB",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
            },
          }}
        />
        <Stack.Screen
          name="main"
          component={Main}
          options={{
            title: "TMDB VIEWER",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#3498DB",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
            },
          }}
        />
        <Stack.Screen
          name="movie"
          component={Movie}
          options={{
            title: "Detalhes do Filme",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#3498DB",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
            },
          }}
        />
        <Stack.Screen
          name="cadastro"
          component={Cadastro}
          options={{
            title: "Cadastro de Usuários",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#3498DB",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
