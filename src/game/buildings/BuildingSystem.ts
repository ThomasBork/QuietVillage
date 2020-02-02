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
    public init(): void {
        this.setUpBuildings();
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
                onUpdateAmount
            )
        );
    }

    private setUpBuildings() {
        this.addBuilding(
            'Hut', 
            'Allows another worker to join your village',
            ResourceValue.fromArray([ResourceType.Wood, 100]),
            ResourceValue.fromArray([ResourceType.Wood, 20]),
            ResourceValue.fromArray([ResourceType.Wood, 1.2]),
            1000,
            300,
            null,
            (thisBuilding: Building): void => {
              this.game.workerSystem.totalWorkerCount.setAdditiveModifier(thisBuilding, thisBuilding.amount);
            }
        );

        this.addBuilding(
            'Shed', 
            'Increases the storage',
            ResourceValue.fromArray([ResourceType.Wood, 300]),
            ResourceValue.fromArray([ResourceType.Wood, 60]),
            ResourceValue.fromArray(),
            1000,
            300,
            null,
            (thisBuilding: Building): void => {
                const increases = ResourceValue.fromArray(
                    [ResourceType.Food, 50],
                    [ResourceType.Wood, 100]
                );

                increases.forEach(increase => 
                    this.game.resourceSystem.getResource(increase.resourceType).cap.setAdditiveModifier(thisBuilding, thisBuilding.amount * increase.value)    
                );
            }
        );

        this.addBuilding(
            'Chicken farm', 
            'Provides food production',
            ResourceValue.fromArray([ResourceType.Wood, 500], [ResourceType.Food, 250]),
            ResourceValue.fromArray([ResourceType.Wood, 100], [ResourceType.Food, 50]),
            ResourceValue.fromArray([ResourceType.Wood, 1.1]),
            1000,
            500,
            null,
            (thisBuilding: Building): void => {
                this.game.resourceSystem.getResource(increase.resourceType).cap.setAdditiveModifier(thisBuilding, thisBuilding.amount * increase.value);
            }
        );
    }
}