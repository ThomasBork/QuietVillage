import { GameSystem } from "../shared/GameSystem";
import { Resource } from "./Resource";
import { ResourceType } from "./ResourceType";
import { ResourceValue } from "./ResourceValue";

export class ResourceSystem extends GameSystem {
    public resources: Resource[] = [];
    public resourceMap: Map<ResourceType, Resource> = new Map();
    private addResourceType(name: string, type: ResourceType): void {
        this.resources.push(new Resource(name, type));
    }
    public init(): void {
        this.addResourceType("Food", ResourceType.Food);
        this.addResourceType("Wood", ResourceType.Wood);
        this.addResourceType("Stone", ResourceType.Stone);
        this.addResourceType("Pelt", ResourceType.Pelt);
        this.addResourceType("Gold", ResourceType.Gold);
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
        });
    }
    public hasResources(resourceValues: ResourceValue[]): boolean {
        return resourceValues.every(resourceValue => {
            const resource = this.getResource(resourceValue.resourceType);
            return resource.amount >= resourceValue.value.value;
        });
    }
    public payResources(resourceValues: ResourceValue[]): void {
        return resourceValues.forEach(resourceValue => {
            const resource = this.getResource(resourceValue.resourceType);
            resource.amount -= resourceValue.value.value;
        });
    }
    public refreshResourcesIsUnlocked() {
        this.resourceMap.get(ResourceType.Food).isUnlocked = true;
        this.resourceMap.get(ResourceType.Wood).isUnlocked = true;
    }
}
