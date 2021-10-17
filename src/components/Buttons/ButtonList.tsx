import { Button } from "./Button";

interface ButtonListProps {
    genres: Array<{
        id: number;
        idString: string;
        name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
        title: string;
    }>;
    selectedGenreId: string;
    buttonClickCallback: (id: string) => void;
}

export default function ButtonList(props: ButtonListProps) {
    return (
        <div className="buttons-container">
            {props.genres && props.genres.map(genre => (
                <Button
                    key={genre.idString}
                    title={genre.title}
                    iconName={genre.name}
                    onClick={() => props.buttonClickCallback(genre.idString)}
                    selected={props.selectedGenreId === genre.idString}
                />
            ))}
        </div>
    )
}