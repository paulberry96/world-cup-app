import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import '../components/GameListItem.css';

const SCORE_CHANCE = 0.133;

export default function GameListItem({ data, onUpdate }) {

    const handleGameStarted = () => {
        data.status = "In Progress";
        onUpdate(data);
    };

    const handleGameEnded = () => {
        data.status = "Ended";
        onUpdate(data);
    };

    const handleScoreGoal = (team) => {
        if(team === 1) data.team1Score++;
        else if(team === 2) data.team2Score++;
        onUpdate(data);
    }

    const statusClass = data.status.replace(/\s/, '-').toLowerCase();

    return (
        <div className="game-list-item">
            <Link to={`/game/${data.id}`}>
                <div className="teams">
                    <div className="team-name">{data.team1}</div>
                    <div className="score">{data.team1Score} - {data.team2Score}</div>
                    <div className="team-name">{data.team2}</div>
                </div>
                <div className={`status-bar status-${statusClass}`}>
                    <div className="game-status">{data.status}</div>
                    <Timer
                        startTimeMs={data.startTimeMs}
                        gameDuration={data.gameDuration}
                        onGameStarted={handleGameStarted}
                        onGameEnded={handleGameEnded}
                        onScoreGoal={handleScoreGoal}
                    ></Timer>
                    <div className="stadium">{data.stadium}</div>
                </div>
            </Link>
        </div>
    );
}

function Timer({ startTimeMs, gameDuration, onGameStarted, onGameEnded, onScoreGoal }) {

    const [counter, setCounter] = useState(startTimeMs - Date.now());
    const [gameStarted, setGameStarted] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);

    const intervalRef = useRef(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCounter(startTimeMs - Date.now());
            const didScoreGoal = Math.random() <= SCORE_CHANCE;
            if(didScoreGoal && gameStarted)
                onScoreGoal(Math.floor((Math.random() * 2 + 1)));
        }, 1000);
        intervalRef.current = id;
        return () => clearInterval(id);
    }, [startTimeMs, onScoreGoal, gameStarted]);

    useEffect(() => {
        if(counter <= 0 && !gameStarted) {
            setGameStarted(true);
            onGameStarted();
        }
        else if(counter <= -gameDuration) {
            setGameEnded(true);
            onGameEnded();
        }
    }, [counter, gameDuration, gameStarted, gameEnded, onGameStarted, onGameEnded]);

    const seconds = Math.abs(Math.floor(counter / 1000));

    const s = seconds >= 0 ? Math.floor(seconds % 60).toString().padStart(2, "0") : "--";
    const m = seconds >= 0 ? Math.floor(seconds / 60 % 60).toString().padStart(2, "0") : "--";

    return (
        <div className="timer">{m}:{s}</div>
    );
}