import { GameSystem } from "../shared/GameSystem";
import { Building } from "./Building";
import { ResourceValue } from "../resources/ResourceValue";
import { ResourceType } from "../resources/ResourceType";
import { Game } from "../Game";

export class BuildingSystem extends GameSystem {
    private game: Game;
    public buildings: Building[] = [];
    public constructor(game: Game) {
        super();
        this.game = game;
    }
    private addBuilding(
        name: string,
        description: string,
        baseCost: ResourceValue[],
        additiveCostPerBuilding: ResourceValue[],
        multiplicativeCostPerBuilding: ResourceValue[],
        onUpdateAmount: (thisBuilding: Building) => void
    ): void {
        this.buildings.push(new Building(name, description, baseCost, additiveCostPerBuilding, multiplicativeCostPerBuilding, onUpdateAmount));
    }
    private buildResourceValues(...resourceValueInput: [ResourceType, number][]): ResourceValue[] {
        return resourceValueInput.map(input => new ResourceValue(input[0], input[1]));
    }
    public init(): void {
        this.addBuilding(
            'Hut', 
            'Allows another worker to join your village',
            this.buildResourceValues([ResourceType.Wood, 100]),
            this.buildResourceValues([ResourceType.Wood, 20]),
            this.buildResourceValues([ResourceType.Wood, 1.2]),
            (thisBuilding: Building): void => {
              this.game.workerSystem.totalWorkerCount.setAdditiveModifier(thisBuilding, thisBuilding.amount);
            }
        );
    }
    public buyBuilding(building: Building): void {
        const cost = building.getCostOfNextBuilding();
        if (this.game.resourceSystem.hasResources(cost)) {
            this.game.resourceSystem.payResources(cost);
            building.incrementAmount();
        }
    }
}