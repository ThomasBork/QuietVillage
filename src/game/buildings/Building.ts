import { ResourceValue } from "../resources/ResourceValue";
import { ObservableFactory, ObservableWith1Argument } from "../../common/Observable";

export class Building {
    public onUpdateAmount: ObservableWith1Argument<Building>;
    public amount: number;
    public name: string;
    public description: string;
    public baseCost: ResourceValue[];
    public additiveCostPerBuilding: ResourceValue[];
    public multiplicativeCostPerBuilding: ResourceValue[];
    public constructor(
        name: string,
        description: string,
        baseCost: ResourceValue[],
        additiveCostPerBuilding: ResourceValue[],
        multiplicativeCostPerBuilding: ResourceValue[],
        onUpdateAmount: (thisBuilding: Building) => void
    ) {
        this.amount = 0;
        this.name = name;
        this.description = description;
        this.baseCost = baseCost;
        this.additiveCostPerBuilding = additiveCostPerBuilding;
        this.multiplicativeCostPerBuilding = multiplicativeCostPerBuilding;
        this.onUpdateAmount = ObservableFactory.createWith1Argument<Building>();
        this.onUpdateAmount.addSubscription(this, onUpdateAmount);
    }
    public incrementAmount() {
        this.amount++;
        this.onUpdateAmount.notify(this);
    }
    public getCostOfNextBuilding(): ResourceValue[] {
        const cost: ResourceValue[] = [];
        this.baseCost.forEach(c => cost.push(new ResourceValue(c.resourceType, c.value.value)));
        this.additiveCostPerBuilding.forEach(c => {
            const value = this.amount * c.value.value;
            if (value > 0) {
                const costResource = cost.find(resource => resource.resourceType === c.resourceType);
                if (costResource) {
                    costResource.value.setAdditiveModifier(c, value);
                } else {
                    cost.push(new ResourceValue(c.resourceType, value));
                }
            }
        });
        this.multiplicativeCostPerBuilding.forEach(c => {
            const value = Math.pow(c.value.value, this.amount);
            if (value > 0) {
                const costResource = cost.find(resource => resource.resourceType === c.resourceType);
                if (costResource) {
                    costResource.value.setMultiplicativeModifier(c, value);
                }
            }
        });
        return cost;
    }
}
