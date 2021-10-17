import { lazy, Suspense } from 'react';
import '../styles/sidebar.scss';
const ButtonList = lazy(() => import("./Buttons/ButtonList"));

interface SideBarProps {
  genres: Array<{
    id: number;
    idString: string;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }>;
  selectedGenreId: string;
  buttonClickCallback: (id: string) => void;
}


export function SideBar(props: SideBarProps) {
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {props.genres &&
          <Suspense fallback={<div>Carregando... </div>}>
            <ButtonList
              genres={props.genres}
              buttonClickCallback={props.buttonClickCallback}
              selectedGenreId={props.selectedGenreId}
            />
          </Suspense>
        }
      </div>

    </nav>
  )
}