import { ResourceType } from "./ResourceType";

export class ResourceValue {
    public resourceType: ResourceType;
    public value: number;
    public constructor (resourceType: ResourceType, value: number) {
        this.resourceType = resourceType;
        this.value = value;
    }
    public static fromArray(...resourceValueInput: [ResourceType, number][]): ResourceValue[] {
        return resourceValueInput.map(input => new ResourceValue(input[0], input[1]));
    } 
}
