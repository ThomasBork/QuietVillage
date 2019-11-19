import * as React from "react";
import { Game } from "../../../../game/Game";
import { UIBuilding } from "./UIBuilding";

export class UIBuildings extends React.Component<{game: Game}> {
    constructor (props: {game: Game}) {
        super(props);
    }
    render() {
        return (
            <ul>
            {this.props.game.buildingSystem.buildings.map((building) => 
                <UIBuilding 
                    key={building.name} 
                    game={this.props.game} 
                    building={building}>
                </UIBuilding>
            )}
            </ul>
        );
    }
}