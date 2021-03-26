import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { api } from '../services/api';

interface MoviesProviderProps {
  children: ReactNode;
}

interface Genre {
  id: number;
  iconName: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MoviesContextData {
  genres: Genre[];
  movies: Movie[];
  selectedGenre: Genre;
  handleSelectGenre: (id: number) => void;
}

export const MoviesContext = createContext({} as MoviesContextData);

export function MoviesProvider({ children }: MoviesProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  
  const [genres, setGenres] = useState<Genre[]>([]);
  
  const [movies, setMovies] = useState<Movie[]>([]);
  
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);
  
  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
      setSelectedGenre(response.data[0]);
    });
  }, []);
  
  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
    
    api.get<Genre>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);
  
  function handleSelectGenre(id: number) {
    setSelectedGenreId(id);
  }
  
  return (
    <MoviesContext.Provider
      value={{genres, movies, selectedGenre, handleSelectGenre}}
    >
      {children}
    </MoviesContext.Provider>
  );
}
  