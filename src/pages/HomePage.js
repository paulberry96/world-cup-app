import { useEffect, useState } from "react";
import Teams from '../data/teams.json';
import Stadiums from '../data/stadiums.json';
import Players from '../data/players.json';
import GameListItem from '../components/GameListItem';


const createGame = (id) => {

    // Randomize Teams and Players
    Teams.sort(() => 0.5 - Math.random());
    Players.sort(() => 0.5 - Math.random());

    // Pick two random teams
    const team1 = Teams[0];
    const team2 = Teams[1];

    // Find 11 players belonging to the team country
    const team1Players = Players.filter((player) => player.Country === team1).slice(0, 11);
    const team2Players = Players.filter((player) => player.Country === team2).slice(0, 11);

    // Pick a random stadium
    const stadium = Stadiums[Math.floor(Math.random() * Stadiums.length)];

    // Generate a random interval between 10 and 60 seconds
    const numSeconds = Math.floor(Math.random() * (60 - 10 + 1) + 10);
    let now = new Date();
    now.setSeconds(now.getSeconds() + numSeconds);
    const startTime = new Date(now);

    // Create game object
    const game = {
        id: id,
        team1: team1,
        team2: team2,
        team1Players: team1Players,
        team2Players: team2Players,
        team1Score: 0,
        team2Score: 0,
        stadium: stadium,
        status: 0,
        startTime: startTime
    };

    return game;
};

export default function HomePage() {

    const [games, setGames] = useState([]);

    useEffect(() => {
        // Create 5 games
        const tempArr = [];
        for(let i = 1; i <= 5; i++)
            tempArr.push(createGame(i));
        setGames(tempArr);
    }, []);

    return (
        <div className="page">
            <div className="game-list">
                {games && games.map(gameData => (
                    <GameListItem key={gameData.id} data={gameData} />
                ))}
            </div>
        </div>
    );
}