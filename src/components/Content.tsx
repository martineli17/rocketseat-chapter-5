import { memo, lazy, Suspense } from "react";
import '../styles/content.scss';
const MovieCardList = lazy(() => import("./Movies/MovieCardList"));
interface ContentProps {
  selectedGenre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  };

  movies: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Rating: string;
    Runtime: string;
  }>;
}

function ContentComponent(props: ContentProps) {
  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {props.selectedGenre.title}</span></span>
      </header>

      <main>
        {props.movies &&
          <Suspense fallback={<div>Carregando... </div>}>
            <MovieCardList movies={props.movies} />
          </Suspense>
        }
      </main>
    </div>
  )
}

export const Content = memo(ContentComponent);