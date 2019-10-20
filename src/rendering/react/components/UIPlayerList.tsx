import * as React from "react";
import { Player } from "../../../game/Player";

export class UIPlayerList extends React.Component<{players: Player[]}, {}> {
    private players: void[];
    constructor (props: {players: Player[]}) {
        super(props);
        this.players = props.players.map((player, index) => {
            <li key={index}>{player.score.toString()}</li>
        });
        console.log("Constructing ui list with " + this.players.length + " players");
    }
    render() {
        return (
            <ul>
            {this.players}
            </ul>
        );
    }
}