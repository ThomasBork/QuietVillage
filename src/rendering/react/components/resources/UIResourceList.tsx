import * as React from "react";
import { Game } from "../../../../game/Game";
import { UIResourceLine } from "./UIResourceLine";
import { Resource } from "../../../../game/resources/Resource";

export class UIResourceList extends React.Component<{game: Game}, {resources: Resource[]}> {
    constructor (props: {game: Game}) {
        super(props);

        const getResources = () => this.props.game.resourceSystem.resources
            .filter(resource => resource.isUnlocked);

        this.state = {resources: getResources()};

        this.props.game.onUpdated.addSubscription(
            this, 
            () => this.setState({resources: getResources()})
        );
    }
    render() {
        return (
            <ul id="resource-list">
            {this.state.resources.map((resource) => 
                <UIResourceLine key={resource.name} resource={resource}></UIResourceLine>
            )}
            </ul>
        );
    }
}