import { GameSystem } from "../shared/GameSystem";
import { Building } from "./Building";
import { ResourceValueContainer } from "../resources/ResourceValueContainer";
import { ResourceType } from "../resources/ResourceType";
import { Game } from "../Game";
import { ResourceValue } from "../resources/ResourceValue";

export class BuildingSystem extends GameSystem {
    private game: Game;
    public name: string = 'Buildings';
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
        baseTimeToBuild: number,
        additiveTimeToBuildPerBuilding: number,
        multiplicativeTimeToBuildPerBuilding: number,
        onUpdateAmount: (thisBuilding: Building) => void
    ): void {
        this.buildings.push(
            new Building(
                name, 
                description, 
                baseCost, 
                additiveCostPerBuilding, 
                multiplicativeCostPerBuilding, 
                baseTimeToBuild,
                additiveTimeToBuildPerBuilding,
                multiplicativeTimeToBuildPerBuilding,
                onUpdateAmount));
    }
    public init(): void {
        this.addBuilding(
            'Hut', 
            'Allows another worker to join your village',
            ResourceValue.fromArray([ResourceType.Wood, 100]),
            ResourceValue.fromArray([ResourceType.Wood, 20]),
            ResourceValue.fromArray([ResourceType.Wood, 1.2]),
            1000,
            500,
            null,
            (thisBuilding: Building): void => {
              this.game.workerSystem.totalWorkerCount.setAdditiveModifier(thisBuilding, thisBuilding.amount);
            }
        );
    }
    public buyBuilding(building: Building): void {
        const costOfNext = building.costOfNext.getAllAsResourceValues();
        if (this.game.resourceSystem.hasResources(costOfNext)) {
            this.game.resourceSystem.payResources(costOfNext);
            building.startBuilding();
        }
    }
    public update(dTime: number): void {
        this.buildings.forEach(building => {
            if (building.isBuildingNext) {
                building.buildTimeRemaining -= dTime;
                if (building.buildTimeRemaining <= 0) {
                    building.finishBuilding();
                }
            }
        });
    }
}