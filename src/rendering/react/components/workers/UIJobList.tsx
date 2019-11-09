import * as React from "react";
import { UIJobLine } from "./UIJobLine";
import { Game } from "../../../../game/Game";

export class UIJobList extends React.Component<{game: Game}> {
    constructor (props: {game: Game}) {
        super(props);
    }
    render() {
        return (
            <ul>
            {this.props.game.workerSystem.jobs.map((job) => 
                <UIJobLine key={job.name} game={this.props.game} job={job}>
                </UIJobLine>
            )}
            </ul>
        );
    }
}