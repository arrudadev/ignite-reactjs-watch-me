import { Button } from '../components/Button';
import { useMovies } from '../hooks/useMovie';

import '../styles/sidebar.scss';

export function SideBar() {
  const { genres, selectedGenre, handleSelectGenre } = useMovies();

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.iconName}
            onClick={() => handleSelectGenre(genre.id)}
            selected={selectedGenre.id === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}