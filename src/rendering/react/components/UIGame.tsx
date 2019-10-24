import * as React from "react";
import { Game } from "../../../game/Game";
import { Player } from "../../../game/Player";
import { UIPlayerList } from "./UIPlayerList";

export class UIGame extends React.Component<{game: Game}, {players: Player[]}> {
    constructor (props: {game: Game}) {
        super(props);
        console.log("Constructing UI");

        this.state = {players: props.game.players};
    }
    addPlayer() {
        console.log("Adding player");
        this.props.game.addPlayer();
        this.setState({players: this.props.game.players});
    }
    render() {
        return (
            <div>
                <input type="button" value="Add player" onClick={(e) => this.addPlayer()}/>
                <UIPlayerList players={this.state.players}></UIPlayerList>
            </div>
        );
    }
}