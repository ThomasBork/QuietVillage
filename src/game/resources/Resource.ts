import { ValueContainer } from "../shared/ValueContainer";
import { ResourceType } from "./ResourceType";

export class Resource {
    public amount: number = 0;
    public income: ValueContainer = new ValueContainer();
    public name: string;
    public type: ResourceType;
    public constructor(name: string, type: ResourceType) {
        this.name = name;
        this.type = type;
    }
}