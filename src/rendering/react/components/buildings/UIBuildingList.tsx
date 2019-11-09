import * as React from "react";
import { Game } from "../../../../game/Game";
import { UIBuildingLine } from "./UIBuildingLine";

export class UIBuildingList extends React.Component<{game: Game}> {
    constructor (props: {game: Game}) {
        super(props);
    }
    render() {
        return (
            <ul>
            {this.props.game.buildingSystem.buildings.map((building) => 
                <UIBuildingLine key={building.name} game={this.props.game} building={building}>
                </UIBuildingLine>
            )}
            </ul>
        );
    }
}