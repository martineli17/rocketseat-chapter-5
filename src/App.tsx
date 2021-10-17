import { useCallback, useEffect, useMemo, useState } from 'react';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { api } from './services/api';
import './styles/global.scss';


interface GenreResponseProps {
  id: number;
  idString: string;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Rating: string;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState<string>("1");
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      const dataFormatted = response.data.map(genre => {
        return {
          ...genre,
          idString: String(genre.id)
        }
      })
      setGenres(dataFormatted);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      const dataFormatted = response.data.map(movie => {
        return {
          ...movie,
          Rating: movie.Ratings?.[0].Value
        }
      })
      setMovies(dataFormatted);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  const handleClickButton = useCallback((id: string) => setSelectedGenreId(id), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        buttonClickCallback={handleClickButton}
      />

      <Content
        selectedGenre={selectedGenre}
        movies={movies}
      />
    </div>
  )
}