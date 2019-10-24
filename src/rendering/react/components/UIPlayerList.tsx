import * as React from "react";
import { Player } from "../../../game/Player";

export class UIPlayerList extends React.Component<{players: Player[]}, {scores: number[]}> {
    constructor (props: {players: Player[]}) {
        super(props);
        const getScores = () => this.props.players.map(player => player.score);
        this.state = {scores: getScores()};

        props.players.forEach(player => 
            player.onIncrement = () => this.setState({scores: getScores()})
        );
    }
    render() {
        return (
            <ul>
            {this.state.scores.map((score) => 
                <li>{score.toString()}</li>
            )}
            </ul>
        );
    }
}