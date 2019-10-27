import * as React from "react";
import { Game } from "../../../game/Game";
import { UIResourceList } from "./UIResourceList";

export class UIGame extends React.Component<{game: Game}, {}> {
    constructor (props: {game: Game}) {
        super(props);
    }
    render() {
        return (
            <div>
                <input type="button" value="Add player" onClick={(e) => console.log("hej")}/>
                <UIResourceList game={this.props.game}></UIResourceList>
            </div>
        );
    }
}