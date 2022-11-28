import { useEffect, useState } from "react";
import Teams from '../data/teams.json';
import Stadiums from '../data/stadiums.json';
import Players from '../data/players.json';
import GameListItem from '../components/GameListItem';

const NUM_GAMES = 5;

const createGame = () => {

    let id = parseInt(localStorage.getItem('id')) || 1;
    localStorage.setItem('id', (id + 1).toString());

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

    // Generate a number between 10 and 60 seconds
    const randMs = Math.floor(Math.random() * (60000 - 10000 + 1) + 10000);
    const now = Date.now();
    const startTimeMs = now + randMs; // Start time is between 10 and 60 seconds from now
    const gameDuration = 60000; // Duration is 1 minute after start time

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
        status: "Upcoming",
        startTimeMs: startTimeMs,
        gameDuration: gameDuration
    };

    return game;
};

export default function HomePage() {

    const [games, setGames] = useState(() => {
        const loaded = JSON.parse(localStorage.getItem('games'));
        return loaded || [];
    });

    useEffect(() => {
        if(games.length < NUM_GAMES) {
            let tempArr = games.slice();
            while(tempArr.length < NUM_GAMES)
                tempArr.push(createGame());
            tempArr.sort((a, b) => a.startTimeMs - b.startTimeMs);
            localStorage.setItem('games', JSON.stringify(tempArr));
            setGames(tempArr);
        }
    }, [games]);

    const handleUpdate = (data) => {
        const index = games.findIndex(g => g.id === data.id);
        if(index > -1) {
            let tempArr = games.slice();
            if(data.status === "Ended") {
                tempArr.splice(index, 1);
            }
            else {
                tempArr[index] = data;
            }
            localStorage.setItem('games', JSON.stringify(tempArr));
            setGames(tempArr);
        }
    };

    return (
        <div className="page">
            <div className="game-list">
                {games && games.map(gameData => (
                    <GameListItem key={gameData.id} data={gameData} onUpdate={handleUpdate} />
                ))}
            </div>
        </div>
    );
}