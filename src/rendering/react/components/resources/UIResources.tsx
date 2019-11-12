import * as React from "react";
import { Game } from "../../../../game/Game";
import { UIResource } from "./UIResource";
import { Resource } from "../../../../game/resources/Resource";

export class UIResources extends React.Component<{game: Game}, {resources: Resource[]}> {
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
                <UIResource key={resource.name} resource={resource}></UIResource>
            )}
            </ul>
        );
    }
}