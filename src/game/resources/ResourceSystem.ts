import { GameSystem } from "../shared/GameSystem";
import { Resource } from "./Resource";
import { ResourceType } from "./ResourceType";
import { ResourceValueContainer } from "./ResourceValueContainer";
import { ResourceValue } from "./ResourceValue";

export class ResourceSystem extends GameSystem {
    public name: string = 'Resources';
    public resources: Resource[] = [];
    public resourceMap: Map<ResourceType, Resource> = new Map();
    public resourceCaps: ResourceValueContainer[] = [];
    private addResourceType(name: string, type: ResourceType, initialCap?: number): void {
        this.resources.push(new Resource(name, type, initialCap));
    }
    public init(): void {
        this.addResourceType("Food", ResourceType.Food, 500);
        this.addResourceType("Wood", ResourceType.Wood, 500);
        this.addResourceType("Stone", ResourceType.Stone, 100);
        this.addResourceType("Pelt", ResourceType.Pelt, 100);
        this.addResourceType("Gold", ResourceType.Gold, 100);
        this.addResourceType("Devotion", ResourceType.Devotion);

        this.resources.forEach(resource => this.resourceMap.set(resource.type, resource));
    }
    public getResource(type: ResourceType): Resource {
        return this.resourceMap.get(type);
    }
    public update(dTime: number): void {
        this.resources.forEach(resource => {
            const dAmount = resource.income.value * dTime / 1000;
            resource.amount += dAmount;
            resource.respectCap();
        });
    }
    public hasResources(resourceValues: ResourceValue[]): boolean {
        return resourceValues.every(resourceValue => {
            const resource = this.getResource(resourceValue.resourceType);
            return resource.amount >= resourceValue.value;
        });
    }
    public payResources(resourceValues: ResourceValue[]): void {
        return resourceValues.forEach(resourceValue => {
            const resource = this.getResource(resourceValue.resourceType);
            resource.amount -= resourceValue.value;
        });
    }
    public refreshResourcesIsUnlocked(): void {
        this.resourceMap.get(ResourceType.Food).isUnlocked = true;
        this.resourceMap.get(ResourceType.Wood).isUnlocked = true;
    }
}
