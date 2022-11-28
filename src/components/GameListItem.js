import '../components/GameListItem.css';

export default function GameListItem({ data }) {
    return (
        <div className="game-list-item">
            <div className="teams">
                <div className="team-name">{data.team1}</div>
                <div className="v-separator">VS</div>
                <div className="team-name">{data.team2}</div>
            </div>
        </div>
    );
}
