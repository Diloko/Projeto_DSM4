import React, { Component } from "react";
import { Keyboard, ActivityIndicator } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from "../styles";

export default class Main extends Component {
  state = {
    newMovie: "",
    movies: [],
    loading: false,
    email: "",
  };

  async componentDidMount() {
    try {
      const userLogado = await AsyncStorage.getItem("userLogado");
      if (userLogado) {
        const { email } = JSON.parse(userLogado);
        const chaveFilmes = `movies_${email}`;
        const storedMovies = await AsyncStorage.getItem(chaveFilmes);
        const movies = storedMovies ? JSON.parse(storedMovies) : [];
        this.setState({ movies, email });
      } else {
        alert("Nenhum usuário logado!");
        this.props.navigation.navigate("login");
      }
    } catch (error) {
      console.error("Erro ao carregar filmes:", error);
    }
  }

  componentDidUpdate(_, prevState) {
    const { movies, email } = this.state;
    if (prevState.movies !== movies && email) {
      const chaveFilmes = `movies_${email}`;
      AsyncStorage.setItem(chaveFilmes, JSON.stringify(movies));
    }
  }

  handleAddMovie = async () => {
    try {
      const { movies, newMovie } = this.state;
      this.setState({ loading: true });

      const response = await api.get("/search/movie", {
        params: { query: newMovie },
      });

      const movie = response.data.results[0];

      if (!movie) {
        alert("Filme não encontrado!");
        this.setState({ loading: false });
        return;
      }

      if (movies.find((m) => m.id === movie.id)) {
        alert("Filme já adicionado!");
        this.setState({ loading: false });
        return;
      }

      const data = {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      };

      this.setState({
        movies: [...movies, data],
        newMovie: "",
        loading: false,
      });
      Keyboard.dismiss();
    } catch (error) {
      alert("Erro ao buscar filme!");
      this.setState({ loading: false });
    }
  };

  render() {
    const { movies, newMovie, loading } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Buscar filme"
            value={newMovie}
            onChangeText={(text) => this.setState({ newMovie: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddMovie}
          />
          <SubmitButton loading={loading} onPress={this.handleAddMovie}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>
        <List
          showsVerticalScrollIndicator={false}
          data={movies}
          keyExtractor={(movie) => String(movie.id)}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.poster }} />
              <Name>{item.title}</Name>
              <Bio>{item.overview}</Bio>
              <ProfileButton
                onPress={() => {
                  this.props.navigation.navigate("movie", { movie: item });
                }}
              >
                <ProfileButtonText>Ver detalhes</ProfileButtonText>
              </ProfileButton>
              <ProfileButton
                onPress={() => {
                  this.setState({
                    movies: movies.filter((m) => m.id !== item.id),
                  });
                }}
                style={{ backgroundColor: "#FFC0CB" }}
              >
                <ProfileButtonText>Remover</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
