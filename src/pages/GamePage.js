import { useParams } from "react-router-dom";
import { useState } from "react";
import './GamePage.css';

export default function GamePage() {

    const { gameId } = useParams();

    const [game, setGame] = useState(() => {
        const loaded = JSON.parse(localStorage.getItem('games'));
        const foundGame = loaded.find((g) => g.id === parseInt(gameId));
        return foundGame || null;
    });

    const statusClass = game.status.replace(/\s/, '-').toLowerCase();

    let startTime = new Date(game.startTimeMs);
    let year = startTime.getFullYear();
    let month = startTime.getMonth();
    let date = startTime.getDate();
    let hour = startTime.getHours();
    let min = startTime.getMinutes();
    startTime = date + '-' + month + '-' + year + ' ' + hour + ':' + min;

    return (
        <div className="page">
            <div className="game-wrapper">
                <div className="game">
                    <div className="teams">
                        <div className="team-name">
                            {game.team1}
                        </div>
                        <div className="score">
                            <div className="score-num">
                                {game.team1Score}
                            </div>
                            <div className="score-sep">:</div>
                            <div className="score-num">
                                {game.team2Score}
                            </div>
                        </div>
                        <div className="team-name">
                            {game.team2}
                        </div>
                    </div>
                    <div className="details">
                        <div className={`status ${statusClass}`}>{game.status}</div>
                        <div className="start-time">{startTime}</div>
                        <div className="stadium">{game.stadium}</div>
                    </div>
                    <div className="players-wrapper">
                        <div className="title">Players</div>
                        <div className="players">
                            <div className="player-list">
                                {game.team1Players && game.team1Players.map(player => (
                                    <div key={player.ID} className="player">
                                        <div className="pos">{player.Pos}</div>
                                        {player.Name}
                                    </div>
                                ))}
                            </div>
                            <div className="player-list">
                                {game.team2Players && game.team2Players.map(player => (
                                    <div key={player.ID} className="player">
                                        {player.Name}
                                        <div className="pos">{player.Pos}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}