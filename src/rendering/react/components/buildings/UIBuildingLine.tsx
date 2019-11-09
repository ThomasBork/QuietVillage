import * as React from "react";
import { Game } from "../../../../game/Game";
import { Building } from "../../../../game/buildings/Building";

interface BuildingLine {
    name: string,
    amount: number
}
export class UIBuildingLine extends React.Component<{game: Game, building: Building}, BuildingLine> {
    public constructor (props: {game: Game, building: Building}) {
        super(props);

        this.state = {
            name: this.props.building.name,
            amount: this.props.building.amount
        };

        this.props.building.onUpdateAmount.addSubscription(
            this,
            (thisBuilding: Building) => 
                this.setState({amount: thisBuilding.amount}));
    }
    private buy (): void {
        this.props.game.buildingSystem.buyBuilding(this.props.building);
    }
    public render(): JSX.Element {
        return (
            <li key={this.state.name}>
                <span>{this.state.name}</span>
                <span>{this.state.amount}</span>
                <input type="button" onClick={()=>this.buy()} value="Buy"/>
            </li>
        );
    }
}