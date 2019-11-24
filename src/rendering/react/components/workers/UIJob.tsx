import * as React from "react";
import { Job } from "../../../../game/workers/Job";
import { Game } from "../../../../game/Game";

interface _State {
    workerCount: number,
    totalWorkerCount: number
}
export class UIJob extends React.Component<{game: Game, job: Job}, _State> {
    public constructor (props: {game: Game, job: Job}) {
        super(props);

        this.state = {
            workerCount: this.props.job.workerCount,
            totalWorkerCount: this.props.game.workerSystem.totalWorkerCount.value
        };

        this.props.job.onWorkerCountChange.addSubscription(
            this,
            (newWorkerCount: number) => 
                this.setState({workerCount: newWorkerCount}));

        this.props.game.workerSystem.totalWorkerCount.onValueChange.addSubscription(
            this,
            (newTotalWorkerCount: number) => 
                this.setState({totalWorkerCount: newTotalWorkerCount}));
    }
    private setWorkers(newWorkerCount: number): void {
        // Only try to update worker count, if there are enough workers
        if(this.props.job.workerCount + this.props.game.workerSystem.idleWorkerCount >= newWorkerCount) {
            this.props.game.workerSystem.setWorkerCountOnJob(this.props.job, newWorkerCount);
        }
    }
    public render(): JSX.Element {
        return (
            <li key={this.props.job.name}>
                <div className="job">
                    <span className="name-and-image-container">
                        <span>{this.props.job.name}({this.state.workerCount})</span>
                        <img src={`./img/worker/jobs/${this.props.job.name.toLowerCase()}.png`} />
                    </span>
                    <span className="description-and-slider-container">
                        <span className="description">{this.props.job.description}</span>
                        <input 
                            className="slider"
                            type="range"
                            min="0" 
                            max={this.state.totalWorkerCount} 
                            step="1"
                            value={this.state.workerCount}
                            onChange={(event) => this.setWorkers(Number(event.target.value))}
                        />
                    </span>
                </div>
            </li>
        );
    }
}