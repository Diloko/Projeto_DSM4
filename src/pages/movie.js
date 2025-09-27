import React, { Component } from "react";
import { ScrollView } from "react-native";
import {
  Container,
  Header,
  AvatarPerfil,
  NamePerfil,
  BioPerfil,
} from "../styles.js";
import api from "../services/api.js";

export default class Movie extends Component {
  state = { //Armazena os dados completos do filme que serão carregados da API.
    details: null,
  };

  async componentDidMount() { //Recupera o filme selecionado que foi passado via navegação.
    const { route } = this.props;
    const { movie } = route.params;

    try {
      const response = await api.get(`/movie/${movie.id}`, { //Faz uma requisição à API para buscar os detalhes completos do filme (sinopse, nota, duração, etc.).
        params: { language: "pt-BR" },
      });
      this.setState({ details: response.data }); //Salva os dados recebidos no estado para renderizar na tela.
    } catch (error) {
      console.error("Erro ao buscar detalhes do filme:", error);
    }
  }

  render() {
    const { details } = this.state;

    if (!details) return null; //Evita renderizar a tela antes de carregar os dados.

    return (
      <ScrollView>
        <Container>
          <Header>
            <AvatarPerfil //Exibe a imagem, título e sinopse do filme.
              source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }}
            />
            <NamePerfil>{details.title}</NamePerfil>
            <BioPerfil>{details.overview}</BioPerfil>
          </Header>

          {/* Exibe informações adicionais: data de lançamento, nota e duração. */}
          <BioPerfil>🎬 Lançamento: {details.release_date}</BioPerfil>
          <BioPerfil>⭐ Nota: {details.vote_average}</BioPerfil>
          <BioPerfil>🕒 Duração: {details.runtime} min</BioPerfil>
        </Container>
      </ScrollView>
    );
  }
}
