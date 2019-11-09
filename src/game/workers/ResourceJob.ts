import { ResourceType } from "../resources/ResourceType";
import { Job } from "./Job";

export class ResourceJob extends Job {
    public resourceType: ResourceType;

    public constructor(name: string, description: string, incomePerSecond: number, resourceType: ResourceType) {
        super(name, description, incomePerSecond);
        this.resourceType = resourceType;
    }
}