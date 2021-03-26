import { useContext } from "react";

import { MoviesContext } from "../contexts/MoviesContext";

export function useMovies() {
  const context = useContext(MoviesContext);
  
  return (context);
}