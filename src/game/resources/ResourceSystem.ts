import { GameSystem } from "../shared/GameSystem";
import { Resource } from "./Resource";
import { ResourceType } from "./ResourceType";

export class ResourceSystem implements GameSystem {
    public resources: Resource[] = [];
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
    }
    public getResource(type: ResourceType): Resource {
        return this.resources.find(r => r.type === type);
    }
    public update(dTime: number): void {
        this.resources.forEach(resource => {
            const dAmount = resource.income.value * dTime / 1000;
            resource.amount += dAmount;
        });
    }
}