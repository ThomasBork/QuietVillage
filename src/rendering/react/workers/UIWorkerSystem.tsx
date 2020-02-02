import * as React from "react";
import { UIJob } from "./UIJob";
import { Game } from "../../../game/Game";

interface _State {
    idleWorkerCount: number
}
export class UIWorkerSystem extends React.Component<{game: Game}, _State> {
    constructor (props: {game: Game}) {
        super(props);

        this.state = {
            idleWorkerCount: this.props.game.workerSystem.idleWorkerCount
        };

        this.props.game.workerSystem.onIdleWorkerCountChange.addSubscription(
            this,
            (newIdleWorkerCount) => {
                this.setState({idleWorkerCount: newIdleWorkerCount});
            });
    }
    render() {
        return (
            <div id="worker-system">
                <div className="job large-list-card">
                    <span className="name-and-image-container">
                        <span>Idle({this.state.idleWorkerCount})</span>
                        <img src={`./img/worker/jobs/idle.png`} />
                    </span>
                    <span className="description-and-slider-container">
                        <span>Idle workers do not help the village in any way - Put them to work!</span>
                    </span>
                </div>
                <ul>
                {this.props.game.workerSystem.jobs.map((job) => 
                    <UIJob key={job.name} game={this.props.game} job={job}>
                    </UIJob>
                )}
                </ul>
            </div>
        );
    }
}