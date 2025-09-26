import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

export default class Cadastro extends Component {
  state = {
    email: "",
    password: "",
  };

  handleCadastro = async () => {
    const { email, password } = this.state;

    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    const newUser = { email, password };

    try {
      // Recupera lista atual de usuários
      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Verifica se o e-mail já está cadastrado
      const alreadyExists = users.some((user) => user.email === email);
      if (alreadyExists) {
        alert("Este e-mail já está cadastrado!");
        return;
      }

      // Adiciona novo usuário à lista
      users.push(newUser);
      await AsyncStorage.setItem("users", JSON.stringify(users));

      alert("Usuário cadastrado com sucesso!");
      this.setState({ email: "", password: "" });
      this.props.navigation.navigate("login");
    } catch (error) {
      alert("Erro ao cadastrar usuário!");
      console.error(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
  },
  button: {
    backgroundColor: "#3498db",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
