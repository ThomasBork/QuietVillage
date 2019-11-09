import * as React from "react";
import { Job } from "../../../../game/workers/Job";
import { Game } from "../../../../game/Game";

interface JobLine {
    name: string,
    workerCount: number
}
export class UIJobLine extends React.Component<{game: Game, job: Job}, JobLine> {
    public constructor (props: {game: Game, job: Job}) {
        super(props);

        this.state = {
            name: this.props.job.name,
            workerCount: this.props.job.workerCount
        };

        this.props.job.onWorkerCountChange.addSubscription(
            this,
            (newWorkerCount: number) => 
                this.setState({workerCount: newWorkerCount}));
    }
    private addWorker (): void {
        const newWorkerCount = this.props.job.workerCount + 1;
        this.setWorkers(newWorkerCount);
    }
    private removeWorker (): void {
        const newWorkerCount = this.props.job.workerCount - 1;
        this.setWorkers(newWorkerCount);
    }
    private setWorkers(newWorkerCount: number): void {
        this.props.game.workerSystem.setWorkerCountOnJob(this.props.job, newWorkerCount);
    }
    public render(): JSX.Element {
        return (
            <li key={this.state.name}>
                <span>{this.state.name}</span>
                <span>{this.state.workerCount}</span>
                <input type="button" onClick={()=>this.addWorker()} value="Add"/>
                <input type="button" onClick={()=>this.removeWorker()} value="Remove"/>
            </li>
        );
    }
}