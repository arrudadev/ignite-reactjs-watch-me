import { useMovies } from '../hooks/useMovie';

import '../styles/header.scss';

export function Header() {
  const { selectedGenre } = useMovies();
  
  return (
    <header>
      <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
    </header>
  );
}