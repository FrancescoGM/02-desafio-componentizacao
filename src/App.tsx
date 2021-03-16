import { useEffect, useState } from "react";
import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import { api } from "./services/api";

import "./styles/global.scss";

import { GenreResponseProps, MovieProps } from "./models/Movies";
import { AxiosResponse } from "axios";

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get("genres").then((res: AxiosResponse<GenreResponseProps[]>) => {
      setGenres(res.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`movies/?Genre_id=${selectedGenreId}`)
      .then((res: AxiosResponse<MovieProps[]>) => {
        setMovies(res.data);
      });

    api
      .get(`genres/${selectedGenreId}`)
      .then((res: AxiosResponse<GenreResponseProps>) => {
        setSelectedGenre(res.data);
      });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        genres={genres}
        handleClickButton={handleClickButton}
        selectedGenreId={selectedGenreId}
      />
      <Content movies={movies} selectedGenre={selectedGenre} />
    </div>
  );
}
