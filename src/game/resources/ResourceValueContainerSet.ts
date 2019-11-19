import { ResourceValueContainer } from "./ResourceValueContainer";
import { ResourceType } from "./ResourceType";
import { ResourceValue } from "./ResourceValue";

export class ResourceValueContainerSet {
    private resourceValueContainerMap: Map<ResourceType, ResourceValueContainer>;
    private resourceValueContainers: ResourceValueContainer[];
    public constructor (resourceValues: ResourceValue[]) {
        this.resourceValueContainers = resourceValues.map(val => new ResourceValueContainer(val.resourceType, val.value));
        this.resourceValueContainerMap = new Map<ResourceType, ResourceValueContainer>();
        this.resourceValueContainers.forEach(val => this.resourceValueContainerMap.set(val.resourceType, val)); 
    }
    private findOrCreateResourceValueContainer(resourceType: ResourceType): ResourceValueContainer {
        let resourceValueContainer = this.resourceValueContainerMap.get(resourceType);
        if (!resourceValueContainer) {
            resourceValueContainer = new ResourceValueContainer(resourceType);
            this.resourceValueContainers.push(resourceValueContainer);
            this.resourceValueContainerMap.set(resourceType, resourceValueContainer);
        }
        return resourceValueContainer;
    }
    public setAdditiveModifier (key: any, resourceType: ResourceType, amount: number): void {
        const resourceValueContainer = this.findOrCreateResourceValueContainer(resourceType);
        resourceValueContainer.value.setAdditiveModifier(key, amount);
    }
    public setMultiplicativeModifier (key: any, resourceType: ResourceType, amount: number): void {
        const resourceValueContainer = this.findOrCreateResourceValueContainer(resourceType);
        resourceValueContainer.value.setMultiplicativeModifier(key, amount);
    }
    public getAll(): ResourceValueContainer[] {
        return this.resourceValueContainers;
    }
    public getAllAsMap(): Map<ResourceType, ResourceValueContainer> {
        return this.resourceValueContainerMap;
    }
    public getAllAsResourceValues(): ResourceValue[] {
        return this.resourceValueContainers.map(container => new ResourceValue(container.resourceType, container.value.value));
    }
}
