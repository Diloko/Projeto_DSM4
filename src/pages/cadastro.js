import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CadastroContainer,
  CadastroInput,
  ProfileButton,
  ProfileButtonText,
} from "../styles"; // Certifique-se de que esses estilos estão definidos

export default class Cadastro extends Component {
  state = { //Define os campos que serão preenchidos pelo usuário. Cada um representa um dado pessoal que será salvo
    nome: "",
    cpf: "",
    curso: "",
    telefone: "",
    email: "",
    password: "",
  };

  handleCadastro = async () => { //Função que é chamada quando o usuário clica no botão "Cadastrar"
    const { nome, cpf, curso, telefone, email, password } = this.state;

    if (!nome || !cpf || !curso || !telefone || !email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    const newUser = { nome, cpf, curso, telefone, email, password };

    try {
      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const alreadyExists = users.some((user) => user.email === email);
      if (alreadyExists) {
        alert("Este e-mail já está cadastrado!");
        return;
      }

      users.push(newUser);
      await AsyncStorage.setItem("users", JSON.stringify(users));

      alert("Usuário cadastrado com sucesso!");
      this.setState({
        nome: "",
        cpf: "",
        curso: "",
        telefone: "",
        email: "",
        password: "",
      });
      this.props.navigation.navigate("login");
    } catch (error) {
      alert("Erro ao cadastrar usuário!");
      console.error(error);
    }
  };

  render() { //Renderiza os campos de entrada e o botão de cadastro.
    const { nome, cpf, curso, telefone, email, password } = this.state;

    return (
      <CadastroContainer>
        <CadastroInput
          placeholder="Nome completo"
          value={nome}
          onChangeText={(text) => this.setState({ nome: text })}
        />
        <CadastroInput
          placeholder="CPF"
          value={cpf}
          keyboardType="numeric"
          onChangeText={(text) => this.setState({ cpf: text })}
        />
        <CadastroInput
          placeholder="Curso"
          value={curso}
          onChangeText={(text) => this.setState({ curso: text })}
        />
        <CadastroInput
          placeholder="Telefone"
          value={telefone}
          keyboardType="phone-pad"
          onChangeText={(text) => this.setState({ telefone: text })}
        />
        <CadastroInput
          placeholder="E-mail"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => this.setState({ email: text })}
        />
        <CadastroInput
          placeholder="Senha"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <ProfileButton onPress={this.handleCadastro}>
          <ProfileButtonText>Cadastrar</ProfileButtonText>
        </ProfileButton>
      </CadastroContainer>
    );
  }
}
