import React = require("react");
import { Game } from "../../../../game/Game";
import { GameSystem } from "../../../../game/shared/GameSystem";
import { UIGameSystemTab } from "./UIGameSystemTab";

export class UIGameSystemTabs extends React.Component<{game: Game, onSelected: (system: GameSystem)=>void}> {
    private gameSystems: GameSystem[];
    private allGameSystems: GameSystem[];
    private selectedGameSystem: GameSystem;
    public constructor(props: {game: Game, onSelected: (system: GameSystem)=>void}) {
        super(props);

        this.allGameSystems = [
            props.game.workerSystem,
            props.game.buildingSystem
        ];

        this.allGameSystems.forEach(system => system.onUnlocked.addSubscription(this, () => this.updateGameSystems()));

        this.gameSystems = this.getUnlockedGameSystems();
    }
    private getUnlockedGameSystems(): GameSystem[] {
        return this.allGameSystems.filter(system => system.isUnlocked);
    }
    private updateGameSystems(): void {
        this.gameSystems = this.allGameSystems.filter(system => system.isUnlocked);
        this.forceUpdate();
    }
    private selectGameSystem(gameSystem: GameSystem): void {
        this.selectedGameSystem = gameSystem;
        this.props.onSelected(gameSystem);
        this.forceUpdate();
    }
    public componentDidMount () {
        this.selectGameSystem(this.props.game.workerSystem);
    }
    public render(): JSX.Element {
        return (
            <ul id="tabs">
                {this.gameSystems.map(system => 
                    <UIGameSystemTab 
                        key={system.name}
                        gameSystem={system} 
                        isSelected={system === this.selectedGameSystem}
                        onSelected={()=>this.selectGameSystem(system)}
                    ></UIGameSystemTab>
                )}
            </ul>
        );
    }
}