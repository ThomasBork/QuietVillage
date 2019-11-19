import { ResourceValueContainer } from "../resources/ResourceValueContainer";
import { ObservableFactory, ObservableWith1Argument } from "../../common/Observable";
import { ResourceValue } from "../resources/ResourceValue";
import { ResourceValueContainerSet } from "../resources/ResourceValueContainerSet";
import { ValueContainer } from "../shared/ValueContainer";

export class Building {
    private additiveCostPerBuilding: ResourceValue[];
    private multiplicativeCostPerBuilding: ResourceValue[];
    private additiveTimeToBuildPerBuilding: number;
    private multiplicativeTimeToBuildPerBuilding: number;
    public onBuildingStarted: ObservableWith1Argument<Building>;
    public onUpdateAmount: ObservableWith1Argument<Building>;
    public amount: number;
    public name: string;
    public description: string;
    public costOfNext: ResourceValueContainerSet;
    public timeToBuildNext: ValueContainer;
    public buildTimeRemaining: number;
    public isBuildingNext: boolean = false;
    public constructor(
        name: string,
        description: string,
        baseCost: ResourceValue[],
        additiveCostPerBuilding: ResourceValue[],
        multiplicativeCostPerBuilding: ResourceValue[],
        baseTimeToBuild: number,
        additiveTimeToBuildPerBuilding: number,
        multiplicativeTimeToBuildPerBuilding: number,
        onUpdateAmount: (thisBuilding: Building) => void
    ) {
        this.amount = 0;
        this.name = name;
        this.description = description;
        this.costOfNext = new ResourceValueContainerSet(baseCost);
        this.timeToBuildNext = new ValueContainer(baseTimeToBuild);

        this.additiveCostPerBuilding = additiveCostPerBuilding;
        this.multiplicativeCostPerBuilding = multiplicativeCostPerBuilding;
        this.additiveTimeToBuildPerBuilding = additiveTimeToBuildPerBuilding;
        this.multiplicativeTimeToBuildPerBuilding = multiplicativeTimeToBuildPerBuilding;

        this.onUpdateAmount = ObservableFactory.createWith1Argument<Building>();
        this.onUpdateAmount.addSubscription(this, onUpdateAmount);

        this.onBuildingStarted = ObservableFactory.createWith1Argument<Building>();
    }
    private refreshNextBuilding(): void {
        this.refreshCostOfNextBuilding();
        this.refreshTimeToBuildNextBuilding();
    }
    private refreshCostOfNextBuilding(): void {
        this.additiveCostPerBuilding.forEach(cost => {
            const newAmount = cost.value * this.amount;
            this.costOfNext.setAdditiveModifier(this, cost.resourceType, newAmount);
        });

        this.multiplicativeCostPerBuilding.forEach(cost => {
            const newAmount = Math.pow(cost.value, this.amount);
            this.costOfNext.setMultiplicativeModifier(this, cost.resourceType, newAmount);
        });
    }
    private refreshTimeToBuildNextBuilding(): void {
        if (this.additiveTimeToBuildPerBuilding) {
            const newAdditiveModifier = this.additiveTimeToBuildPerBuilding * this.amount;
            this.timeToBuildNext.setAdditiveModifier(this, newAdditiveModifier);
        }
        if (this.multiplicativeTimeToBuildPerBuilding) {
            const newMultiplicativeModifier = Math.pow(this.multiplicativeTimeToBuildPerBuilding, this.amount);
            this.timeToBuildNext.setMultiplicativeModifier(this, newMultiplicativeModifier);
        }
    }
    public startBuilding(): void {
        this.isBuildingNext = true;
        this.buildTimeRemaining = this.timeToBuildNext.value;
        this.onBuildingStarted.notify(this);
    }
    public finishBuilding(): void {
        this.amount++;
        this.isBuildingNext = false;
        this.refreshNextBuilding();
        this.onUpdateAmount.notify(this);
    }
}
