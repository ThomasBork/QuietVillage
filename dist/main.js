!function(e){var t={};function s(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,o){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(o,r,function(t){return e[t]}.bind(null,r));return o},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=6)}([function(e,t){e.exports=React},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(10);class r{constructor(){this.subscriptions=[]}static create(){return new r}static createWith1Argument(){return new r}static createWith2Arguments(){return new r}addSubscription(e,t){const s=new o.ObservableSubscription(e,t);this.subscriptions.push(s)}removeSubscription(e){this.subscriptions=this.subscriptions.filter(t=>t.observer!==e)}notify(...e){this.subscriptions.forEach(t=>t.callback.apply(t.observer,e))}}t.ObservableFactory=r},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(1);class r{constructor(e,t){this.amount=t,this.key=e}}t.ValueContainer=class{constructor(){this.additiveModifiers=[],this.multiplicativeModifiers=[],this.value=0,this.onValueChange=o.ObservableFactory.createWith1Argument()}recalculateValue(){let e=0;this.additiveModifiers.forEach(t=>e+=t.amount),this.multiplicativeModifiers.forEach(t=>e*=t.amount),this.value!==e&&(this.value=e,this.onValueChange.notify(e))}setAdditiveModifier(e,t){const s=this.additiveModifiers.find(t=>t.key===e);if(s)s.amount=t;else{const s=new r(e,t);this.additiveModifiers.push(s)}this.recalculateValue()}setMultiplicativeModifier(e,t){const s=this.multiplicativeModifiers.find(t=>t.key===e);if(s)s.amount=t;else{const s=new r(e,t);this.multiplicativeModifiers.push(s)}this.recalculateValue()}removeAllModifiers(e){this.additiveModifiers=this.additiveModifiers.filter(t=>t.key!==e),this.multiplicativeModifiers=this.multiplicativeModifiers.filter(t=>t.key!==e)}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(1);t.GameSystem=class{constructor(){this._isUnlocked=!1,this.onUnlocked=o.ObservableFactory.create()}get isUnlocked(){return this._isUnlocked}set isUnlocked(e){this._isUnlocked!==e&&(this._isUnlocked=e,e&&this.onUnlocked.notify())}update(e){}init(){}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.Devotion=0]="Devotion",e[e.Food=1]="Food",e[e.Gold=2]="Gold",e[e.Pelt=3]="Pelt",e[e.Stone=4]="Stone",e[e.Wood=5]="Wood"}(t.ResourceType||(t.ResourceType={}))},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(2);t.ResourceValue=class{constructor(e,t){this.resourceType=e,this.value=new o.ValueContainer,this.value.setAdditiveModifier(this,t)}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(0),r=s(7),i=s(8);r.render(o.createElement(i.UIGame,null),document.getElementById("game-container"))},function(e,t){e.exports=ReactDOM},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(0),r=s(9),i=s(18),n=s(19),u=s(20);class a extends o.Component{constructor(e){super(e),this.state={game:null}}newGame(){const e=r.Game.new();e.buildingSystem.onUnlocked.addSubscription(this,()=>this.forceUpdate()),this.setState({game:e})}render(){return o.createElement("div",null,o.createElement(n.UIHeader,{versionNumber:"0.0.1",onNewGameClick:()=>this.newGame()}),this.state.game?o.createElement(i.GameContext.Provider,{value:this.state.game},o.createElement(u.UIBody,{game:this.state.game})):null)}}t.UIGame=a},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(1),r=s(11),i=s(13),n=s(16);class u{constructor(){this.updateFrequency=100,this.maxTimeToResumePerUpdate=864e5,this.lastUpdateAsNumber=Date.now(),this.onUpdated=o.ObservableFactory.create()}static new(){const e=new u;return e.init(),e.startNewGame(),e}init(){this.buildingSystem=new n.BuildingSystem(this),this.buildingSystem.init(),this.resourceSystem=new r.ResourceSystem,this.resourceSystem.init(),this.workerSystem=new i.WorkerSystem(this),this.workerSystem.init()}startNewGame(){this.startTimeAsNumber=Date.now(),this.workerSystem.newGame(),this.refreshSystemsIsUnlocked(),this.resourceSystem.refreshResourcesIsUnlocked(),this.beginUpdating()}beginUpdating(){this.updateIntervalID=setInterval(()=>{this.update()},this.updateFrequency)}update(){let e=Date.now()-this.lastUpdateAsNumber;for(e>this.maxTimeToResumePerUpdate&&(e=this.maxTimeToResumePerUpdate,this.lastUpdateAsNumber=Date.now()-this.maxTimeToResumePerUpdate);e>this.updateFrequency;)e-=this.updateFrequency,this.lastUpdateAsNumber=this.lastUpdateAsNumber+this.updateFrequency,this.updateGameSystems(this.updateFrequency);this.onUpdated.notify()}updateGameSystems(e){this.resourceSystem.update(e)}refreshSystemsIsUnlocked(){this.workerSystem.isUnlocked=!0,this.resourceSystem.isUnlocked=!0,this.buildingSystem.isUnlocked=this.workerSystem.totalWorkerCount.value>1||0===this.workerSystem.idleWorkerCount}}t.Game=u},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.ObservableSubscription=class{constructor(e,t){this.observer=e,this.callback=t}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(3),r=s(12),i=s(4);class n extends o.GameSystem{constructor(){super(...arguments),this.resources=[],this.resourceMap=new Map}addResourceType(e,t){this.resources.push(new r.Resource(e,t))}init(){this.addResourceType("Food",i.ResourceType.Food),this.addResourceType("Wood",i.ResourceType.Wood),this.addResourceType("Stone",i.ResourceType.Stone),this.addResourceType("Pelt",i.ResourceType.Pelt),this.addResourceType("Gold",i.ResourceType.Gold),this.addResourceType("Devotion",i.ResourceType.Devotion),this.resources.forEach(e=>this.resourceMap.set(e.type,e))}getResource(e){return this.resourceMap.get(e)}update(e){this.resources.forEach(t=>{const s=t.income.value*e/1e3;t.amount+=s})}hasResources(e){return e.every(e=>{return this.getResource(e.resourceType).amount>=e.value.value})}payResources(e){return e.forEach(e=>{this.getResource(e.resourceType).amount-=e.value.value})}refreshResourcesIsUnlocked(){this.resourceMap.get(i.ResourceType.Food).isUnlocked=!0,this.resourceMap.get(i.ResourceType.Wood).isUnlocked=!0}}t.ResourceSystem=n},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(2),r=s(1);t.Resource=class{constructor(e,t){this._isUnlocked=!1,this.onUnlocked=r.ObservableFactory.create(),this.amount=0,this.income=new o.ValueContainer,this.name=e,this.type=t}get isUnlocked(){return this._isUnlocked}set isUnlocked(e){this._isUnlocked!==e&&(this._isUnlocked=e,e&&this.onUnlocked.notify())}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(3),r=s(1),i=s(14),n=s(4),u=s(2);class a extends o.GameSystem{constructor(e){super(),this.game=e}init(){this.totalWorkerCount=new u.ValueContainer,this.totalWorkerCount.setAdditiveModifier(this,1),this.totalWorkerCount.onValueChange.addSubscription(this,e=>this.recalculateIdleWorkerCount()),this.gathererJob=new i.ResourceJob("Gatherer","Search nearby forests for berries and shrooms",.5,n.ResourceType.Food),this.woodcutterJob=new i.ResourceJob("Woodcutter","Chop down trees for wood",25,n.ResourceType.Wood),this.resourceJobs=[this.gathererJob,this.woodcutterJob],this.jobs=[...this.resourceJobs],this.resourceJobs.forEach(e=>{const t=this.game.resourceSystem.getResource(e.resourceType);e.onWorkerCountChange.addSubscription(this,s=>{const o=s*e.value.value;t.income.setAdditiveModifier(e,o)})}),this.onIdleWorkerCountChange=r.ObservableFactory.createWith1Argument()}newGame(){this.recalculateIdleWorkerCount()}recalculateIdleWorkerCount(){let e=this.totalWorkerCount.value;this.jobs.forEach(t=>e-=t.workerCount),this.idleWorkerCount!==e&&(this.idleWorkerCount=e,this.onIdleWorkerCountChange.notify(this.idleWorkerCount))}setWorkerCountOnJob(e,t){const s=t-e.workerCount;if(s>0){if(!(this.idleWorkerCount>=s))throw`Cannot assign ${s} workers - only ${this.idleWorkerCount} workers available.`;e.workerCount+=s}else{if(!(t>=0))throw"Cannot assign a negative amount of workers to a job";e.workerCount+=s}this.game.buildingSystem.isUnlocked=!0,this.recalculateIdleWorkerCount()}}t.WorkerSystem=a},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(15);class r extends o.Job{constructor(e,t,s,o){super(e,t,s),this.resourceType=o}}t.ResourceJob=r},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(2),r=s(1);t.Job=class{constructor(e,t,s){this._workerCount=0,this.name=e,this.description=t,this.value=new o.ValueContainer,this.value.setAdditiveModifier(this,s),this.onWorkerCountChange=r.ObservableFactory.createWith1Argument()}get workerCount(){return this._workerCount}set workerCount(e){this._workerCount=e,this.onWorkerCountChange.notify(e)}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(3),r=s(17),i=s(5),n=s(4);class u extends o.GameSystem{constructor(e){super(),this.buildings=[],this.game=e}addBuilding(e,t,s,o,i,n){this.buildings.push(new r.Building(e,t,s,o,i,n))}buildResourceValues(...e){return e.map(e=>new i.ResourceValue(e[0],e[1]))}init(){this.addBuilding("Hut","Allows another worker to join your village",this.buildResourceValues([n.ResourceType.Wood,100]),this.buildResourceValues([n.ResourceType.Wood,20]),this.buildResourceValues([n.ResourceType.Wood,1.2]),e=>{this.game.workerSystem.totalWorkerCount.setAdditiveModifier(e,e.amount)})}buyBuilding(e){const t=e.getCostOfNextBuilding();this.game.resourceSystem.hasResources(t)&&(this.game.resourceSystem.payResources(t),e.incrementAmount())}}t.BuildingSystem=u},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(5),r=s(1);t.Building=class{constructor(e,t,s,o,i,n){this.amount=0,this.name=e,this.description=t,this.baseCost=s,this.additiveCostPerBuilding=o,this.multiplicativeCostPerBuilding=i,this.onUpdateAmount=r.ObservableFactory.createWith1Argument(),this.onUpdateAmount.addSubscription(this,n)}incrementAmount(){this.amount++,this.onUpdateAmount.notify(this)}getCostOfNextBuilding(){const e=[];return this.baseCost.forEach(t=>e.push(new o.ResourceValue(t.resourceType,t.value.value))),this.additiveCostPerBuilding.forEach(t=>{const s=this.amount*t.value.value;if(s>0){const r=e.find(e=>e.resourceType===t.resourceType);r?r.value.setAdditiveModifier(t,s):e.push(new o.ResourceValue(t.resourceType,s))}}),this.multiplicativeCostPerBuilding.forEach(t=>{const s=Math.pow(t.value.value,this.amount);if(s>0){const o=e.find(e=>e.resourceType===t.resourceType);o&&o.value.setMultiplicativeModifier(t,s)}}),e}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(0);t.GameContext=o.createContext(null)},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(0);class r extends o.Component{render(){return o.createElement("div",{id:"header"},o.createElement("span",{className:"title-container"},o.createElement("span",{className:"title"},"Quiet Village"),o.createElement("span",{className:"version-number"},"v",this.props.versionNumber)),o.createElement("span",{className:"button btn-new-game",onClick:this.props.onNewGameClick},"New game"))}}t.UIHeader=r},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(0),r=s(21),i=s(23),n=s(25);class u extends o.Component{render(){return o.createElement("div",{id:"body"},o.createElement("span",null,o.createElement(r.UIJobList,{game:this.props.game}),this.props.game.buildingSystem.isUnlocked?o.createElement(i.UIBuildingList,{game:this.props.game}):null),o.createElement(n.UIResourceList,{game:this.props.game}))}}t.UIBody=u},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(0),r=s(22);class i extends o.Component{constructor(e){super(e)}render(){return o.createElement("ul",null,this.props.game.workerSystem.jobs.map(e=>o.createElement(r.UIJobLine,{key:e.name,game:this.props.game,job:e})))}}t.UIJobList=i},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(0);class r extends o.Component{constructor(e){super(e),this.state={name:this.props.job.name,workerCount:this.props.job.workerCount},this.props.job.onWorkerCountChange.addSubscription(this,e=>this.setState({workerCount:e}))}addWorker(){const e=this.props.job.workerCount+1;this.setWorkers(e)}removeWorker(){const e=this.props.job.workerCount-1;this.setWorkers(e)}setWorkers(e){this.props.game.workerSystem.setWorkerCountOnJob(this.props.job,e)}render(){return o.createElement("li",{key:this.state.name},o.createElement("span",null,this.state.name),o.createElement("span",null,this.state.workerCount),o.createElement("input",{type:"button",onClick:()=>this.addWorker(),value:"Add"}),o.createElement("input",{type:"button",onClick:()=>this.removeWorker(),value:"Remove"}))}}t.UIJobLine=r},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(0),r=s(24);class i extends o.Component{constructor(e){super(e)}render(){return o.createElement("ul",null,this.props.game.buildingSystem.buildings.map(e=>o.createElement(r.UIBuildingLine,{key:e.name,game:this.props.game,building:e})))}}t.UIBuildingList=i},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(0);class r extends o.Component{constructor(e){super(e),this.state={name:this.props.building.name,amount:this.props.building.amount},this.props.building.onUpdateAmount.addSubscription(this,e=>this.setState({amount:e.amount}))}buy(){this.props.game.buildingSystem.buyBuilding(this.props.building)}render(){return o.createElement("li",{key:this.state.name},o.createElement("span",null,this.state.name),o.createElement("span",null,this.state.amount),o.createElement("input",{type:"button",onClick:()=>this.buy(),value:"Buy"}))}}t.UIBuildingLine=r},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(0),r=s(26);class i extends o.Component{constructor(e){super(e);const t=()=>this.props.game.resourceSystem.resources.filter(e=>e.isUnlocked);this.state={resources:t()},this.props.game.onUpdated.addSubscription(this,()=>this.setState({resources:t()}))}render(){return o.createElement("ul",{id:"resource-list"},this.state.resources.map(e=>o.createElement(r.UIResourceLine,{key:e.name,resource:e})))}}t.UIResourceList=i},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(0),r=s(27);class i extends o.Component{render(){return o.createElement("li",{className:"resource-line"},o.createElement("span",null,o.createElement("span",{className:"name"},this.props.resource.name),o.createElement("span",{className:"increase-per-second"},"(",r.NumberFormatter.Format(this.props.resource.income.value,2,2),")")),o.createElement("span",{className:"amount"},r.NumberFormatter.Format(this.props.resource.amount,2,2)))}}t.UIResourceLine=i},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.NumberFormatter=class{static Format(e,t,s,o){void 0===t&&(t=2),void 0===s&&(s=t),void 0===o&&(o=!1);const r=Math.pow(10,t);let i;return o?(e-=1e-4,i=Math.ceil(e*r)/r):(e+=1e-4,i=Math.floor(e*r)/r),s?i.toFixed(s):i.toString()}}}]);
//# sourceMappingURL=main.js.map