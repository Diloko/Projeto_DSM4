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
  state = {
    details: null,
  };

  async componentDidMount() {
    const { route } = this.props;
    const { movie } = route.params;

    try {
      const response = await api.get(`/movie/${movie.id}`, {
        params: { language: "pt-BR" },
      });
      this.setState({ details: response.data });
    } catch (error) {
      console.error("Erro ao buscar detalhes do filme:", error);
    }
  }

  render() {
    const { details } = this.state;

    if (!details) return null;

    return (
      <ScrollView>
        <Container>
          <Header>
            <AvatarPerfil
              source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }}
            />
            <NamePerfil>{details.title}</NamePerfil>
            <BioPerfil>{details.overview}</BioPerfil>
          </Header>

          {/* Você pode adicionar mais informações aqui */}
          <BioPerfil>🎬 Lançamento: {details.release_date}</BioPerfil>
          <BioPerfil>⭐ Nota: {details.vote_average}</BioPerfil>
          <BioPerfil>🕒 Duração: {details.runtime} min</BioPerfil>
        </Container>
      </ScrollView>
    );
  }
}
