import { ResourceType } from "./ResourceType";
import { ValueContainer } from "../shared/ValueContainer";

export class ResourceValue {
    public resourceType: ResourceType;
    public value: ValueContainer;
    public constructor (resourceType: ResourceType, baseValue: number) {
        this.resourceType = resourceType;
        this.value = new ValueContainer();
        this.value.setAdditiveModifier(this, baseValue);
    }
}
