import * as React from "react";
import { Game } from "../../../../game/Game";
import { Building } from "../../../../game/buildings/Building";
import { UIBuildingCost } from "./UIBuildingCost";
import { UIProgressBar } from "../shared/UIProgressBar";

interface BuildingLine {
    name: string,
    amount: number
}
export class UIBuilding extends React.Component<{game: Game, building: Building}, BuildingLine> {
    public constructor (props: {game: Game, building: Building}) {
        super(props);

        this.props.building.onUpdateAmount.addSubscription(
            this,
            (thisBuilding: Building) => this.forceUpdate()
        );

        this.props.game.onUpdate.addSubscription(this, () => this.forceUpdate());
    }
    private buy (): void {
        this.props.game.buildingSystem.buyBuilding(this.props.building);
    }
    private getAmountText(): string {
        return this.props.building.amount > 0 ? '(' + this.props.building.amount + ')' : '';
    }
    public render(): JSX.Element {
        return (
            <li key={this.props.building.name} className="building">
                <span className="name-and-image-container">
                    <span className="name">{this.props.building.name + this.getAmountText()}</span>
                    <img src={`./img/buildings/${this.props.building.name.toLocaleLowerCase()}.png`} />
                </span>
                <span className="description-container">
                    {this.props.building.isBuildingNext &&
                        <UIProgressBar min={0} max={this.props.building.timeToBuildNext.value} current={this.props.building.buildTimeRemaining}></UIProgressBar>
                    }
                    <span className="description">{this.props.building.description}</span>
                </span>
                <UIBuildingCost onClick={() => this.buy()} building={this.props.building}></UIBuildingCost>
            </li>
        );
    }
}