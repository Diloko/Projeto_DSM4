import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState(""); //useState armazena os dados digitados pelo usuário.
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

const handleLogin = async () => { //Função chamada ao clicar em "Entrar".
  try {
    const storedUsers = await AsyncStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    if (users.length === 0) {
      alert("Nenhum usuário cadastrado!");
      return;
    }

    const userFound = users.find(
      (user) => user.email === email && user.password === password
    );

    if (userFound) {
      // ✅ Salva o usuário logado para uso no Main.js
      await AsyncStorage.setItem("userLogado", JSON.stringify(userFound));
      navigation.navigate("main");
    } else {
      alert("E-mail ou senha inválidos!");
    }
  } catch (error) {
    alert("Erro ao tentar login!");
    console.error(error);
  }
};

  const handleCadastro = () => { //Redireciona para a tela de cadastro.
    navigation.navigate('cadastro')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#000000ff"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#000000ff"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "80%",
    color: "#000",
  },
  button: {
    backgroundColor: "#3498db",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Login;