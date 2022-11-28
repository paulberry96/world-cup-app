import { useParams } from "react-router-dom";

export default function GamePage(props) {

    const { gameId } = useParams();

    return (
        <div>Game Page {gameId}</div>
    );
}