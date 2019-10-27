import * as React from "react";
import { Game } from "../../../game/Game";
import { UIResourceLine } from "./UIResourceLine";

interface ResourceLine {
    name: string,
    amount: number
}
export class UIResourceList extends React.Component<{game: Game}, {resources: ResourceLine[]}> {
    constructor (props: {game: Game}) {
        super(props);

        const getResources = () => this.props.game.resourceSystem.resources.map(resource => {
            return {
                name: resource.name, 
                amount: resource.amount
            };
        });

        this.state = {resources: getResources()};

        this.props.game.onUpdated.addSubscription(
            this, 
            () => this.setState({resources: getResources()})
        );
    }
    render() {
        return (
            <ul>
            {this.state.resources.map((resource) => 
                <UIResourceLine key={resource.name} name={resource.name} amount={resource.amount}></UIResourceLine>
            )}
            </ul>
        );
    }
}