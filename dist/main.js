!function(e){var t={};function s(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(i,r,function(t){return e[t]}.bind(null,r));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=8)}([function(e,t){e.exports=React},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(12);class r{constructor(){this.subscriptions=[]}static create(){return new r}static createWith1Argument(){return new r}static createWith2Arguments(){return new r}addSubscription(e,t){const s=new i.ObservableSubscription(e,t);this.subscriptions.push(s)}removeSubscription(e){this.subscriptions=this.subscriptions.filter(t=>t.observer!==e)}notify(...e){this.subscriptions.forEach(t=>t.callback.apply(t.observer,e))}}t.ObservableFactory=r},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(1);class r{constructor(e,t){this.amount=t,this.key=e}}t.ValueContainer=class{constructor(e){this.additiveModifiers=[],this.multiplicativeModifiers=[],this.value=0,this.onValueChange=i.ObservableFactory.createWith1Argument(),void 0!==e&&this.setAdditiveModifier(this,e)}recalculateValue(){let e=0;this.additiveModifiers.forEach(t=>e+=t.amount),this.multiplicativeModifiers.forEach(t=>e*=t.amount),this.value!==e&&(this.value=e,this.onValueChange.notify(e))}setAdditiveModifier(e,t){const s=this.additiveModifiers.find(t=>t.key===e);if(s)s.amount=t;else{const s=new r(e,t);this.additiveModifiers.push(s)}this.recalculateValue()}setMultiplicativeModifier(e,t){const s=this.multiplicativeModifiers.find(t=>t.key===e);if(s)s.amount=t;else{const s=new r(e,t);this.multiplicativeModifiers.push(s)}this.recalculateValue()}removeAllModifiers(e){this.additiveModifiers=this.additiveModifiers.filter(t=>t.key!==e),this.multiplicativeModifiers=this.multiplicativeModifiers.filter(t=>t.key!==e)}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(1);t.GameSystem=class{constructor(){this._isUnlocked=!1,this.onUnlocked=i.ObservableFactory.create()}get isUnlocked(){return this._isUnlocked}set isUnlocked(e){this._isUnlocked!==e&&(this._isUnlocked=e,e&&this.onUnlocked.notify())}update(e){}init(){}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.Devotion=0]="Devotion",e[e.Food=1]="Food",e[e.Gold=2]="Gold",e[e.Pelt=3]="Pelt",e[e.Stone=4]="Stone",e[e.Wood=5]="Wood"}(t.ResourceType||(t.ResourceType={}))},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class i{constructor(e,t){this.resourceType=e,this.value=t}static fromArray(...e){return e.map(e=>new i(e[0],e[1]))}}t.ResourceValue=i},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0);t.GameContext=i.createContext(null)},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class i{static Format(e,t,s,r){void 0===t&&(t=2),void 0===s&&(s=t),void 0===r&&(r=!1);let o=0;for(;e>1e4;)e/=1e3,o++;const n=Math.pow(10,t);let a,u;r?(e-=1e-4,a=Math.ceil(e*n)/n):(e+=1e-4,a=Math.floor(e*n)/n),u=s?a.toFixed(s):a.toString();const c=i.postfixes[o];return c&&(u+=c),u}}t.NumberFormatter=i,i.postfixes=["","k","m","b"]},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(9),o=s(10);r.render(i.createElement(o.UIGame,null),document.getElementById("game-container"))},function(e,t){e.exports=ReactDOM},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(11),o=s(6),n=s(22),a=s(23);class u extends i.Component{constructor(e){super(e),this.state={game:null}}newGame(){const e=r.Game.new();e.buildingSystem.onUnlocked.addSubscription(this,()=>this.forceUpdate()),this.setState({game:e})}render(){return i.createElement("div",null,i.createElement(n.UIHeader,{versionNumber:"0.0.1",onNewGameClick:()=>this.newGame()}),this.state.game?i.createElement(o.GameContext.Provider,{value:this.state.game},i.createElement(a.UIBody,{game:this.state.game})):null)}}t.UIGame=u},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(1),r=s(13),o=s(15),n=s(18);class a{constructor(){this.updateFrequency=100,this.maxTimeToResumePerUpdate=864e5,this.lastUpdateAsNumber=Date.now(),this.onUpdate=i.ObservableFactory.create()}static new(){const e=new a;return e.init(),e.startNewGame(),e}init(){this.buildingSystem=new n.BuildingSystem(this),this.buildingSystem.init(),this.resourceSystem=new r.ResourceSystem,this.resourceSystem.init(),this.workerSystem=new o.WorkerSystem(this),this.workerSystem.init()}startNewGame(){this.startTimeAsNumber=Date.now(),this.workerSystem.newGame(),this.refreshSystemsIsUnlocked(),this.resourceSystem.refreshResourcesIsUnlocked(),this.beginUpdating()}beginUpdating(){this.updateIntervalID=setInterval(()=>{this.update()},this.updateFrequency)}update(){let e=Date.now()-this.lastUpdateAsNumber;for(e>this.maxTimeToResumePerUpdate&&(e=this.maxTimeToResumePerUpdate,this.lastUpdateAsNumber=Date.now()-this.maxTimeToResumePerUpdate);e>this.updateFrequency;)e-=this.updateFrequency,this.lastUpdateAsNumber=this.lastUpdateAsNumber+this.updateFrequency,this.updateGameSystems(this.updateFrequency);this.onUpdate.notify()}updateGameSystems(e){this.resourceSystem.update(e),this.buildingSystem.update(e)}refreshSystemsIsUnlocked(){this.workerSystem.isUnlocked=!0,this.resourceSystem.isUnlocked=!0,this.buildingSystem.isUnlocked=this.workerSystem.totalWorkerCount.value>1||0===this.workerSystem.idleWorkerCount}}t.Game=a},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.ObservableSubscription=class{constructor(e,t){this.observer=e,this.callback=t}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(3),r=s(14),o=s(4);class n extends i.GameSystem{constructor(){super(...arguments),this.name="Resources",this.resources=[],this.resourceMap=new Map,this.resourceCaps=[]}addResourceType(e,t,s){this.resources.push(new r.Resource(e,t,s))}init(){this.addResourceType("Food",o.ResourceType.Food,500),this.addResourceType("Wood",o.ResourceType.Wood,500),this.addResourceType("Stone",o.ResourceType.Stone,100),this.addResourceType("Pelt",o.ResourceType.Pelt,100),this.addResourceType("Gold",o.ResourceType.Gold,100),this.addResourceType("Devotion",o.ResourceType.Devotion),this.resources.forEach(e=>this.resourceMap.set(e.type,e))}getResource(e){return this.resourceMap.get(e)}update(e){this.resources.forEach(t=>{const s=t.income.value*e/1e3;t.amount+=s,t.respectCap()})}hasResources(e){return e.every(e=>{return this.getResource(e.resourceType).amount>=e.value})}payResources(e){return e.forEach(e=>{this.getResource(e.resourceType).amount-=e.value})}refreshResourcesIsUnlocked(){this.resourceMap.get(o.ResourceType.Food).isUnlocked=!0,this.resourceMap.get(o.ResourceType.Wood).isUnlocked=!0}}t.ResourceSystem=n},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(2),r=s(1);t.Resource=class{constructor(e,t,s){this._isUnlocked=!1,this.onUnlocked=r.ObservableFactory.create(),this.amount=0,this.income=new i.ValueContainer,this.cap=new i.ValueContainer,this.name=e,this.type=t,void 0===s?this.hasCap=!1:(this.hasCap=!0,this.cap.setAdditiveModifier(this,s))}get isUnlocked(){return this._isUnlocked}set isUnlocked(e){this._isUnlocked!==e&&(this._isUnlocked=e,e&&this.onUnlocked.notify())}respectCap(){this.hasCap&&this.amount>this.cap.value&&(this.amount=this.cap.value)}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(3),r=s(1),o=s(16),n=s(4),a=s(2);class u extends i.GameSystem{constructor(e){super(),this.name="Workers",this.game=e}init(){this.totalWorkerCount=new a.ValueContainer,this.totalWorkerCount.setAdditiveModifier(this,1),this.totalWorkerCount.onValueChange.addSubscription(this,e=>this.recalculateIdleWorkerCount()),this.gathererJob=new o.ResourceJob("Gatherer","Search nearby forests for berries and shrooms",.5,n.ResourceType.Food),this.woodcutterJob=new o.ResourceJob("Woodcutter","Chop down trees for wood",25,n.ResourceType.Wood),this.resourceJobs=[this.gathererJob,this.woodcutterJob],this.jobs=[...this.resourceJobs],this.resourceJobs.forEach(e=>{const t=this.game.resourceSystem.getResource(e.resourceType);e.onWorkerCountChange.addSubscription(this,s=>{const i=s*e.value.value;t.income.setAdditiveModifier(e,i)})}),this.onIdleWorkerCountChange=r.ObservableFactory.createWith1Argument()}newGame(){this.recalculateIdleWorkerCount()}recalculateIdleWorkerCount(){let e=this.totalWorkerCount.value;this.jobs.forEach(t=>e-=t.workerCount),this.idleWorkerCount!==e&&(this.idleWorkerCount=e,this.onIdleWorkerCountChange.notify(this.idleWorkerCount))}setWorkerCountOnJob(e,t){const s=t-e.workerCount;if(s>0){if(!(this.idleWorkerCount>=s))throw`Cannot assign ${s} workers - only ${this.idleWorkerCount} workers available.`;e.workerCount+=s}else{if(!(t>=0))throw"Cannot assign a negative amount of workers to a job";e.workerCount+=s}this.game.buildingSystem.isUnlocked=!0,this.recalculateIdleWorkerCount()}}t.WorkerSystem=u},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(17);class r extends i.Job{constructor(e,t,s,i){super(e,t,s),this.resourceType=i}}t.ResourceJob=r},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(2),r=s(1);t.Job=class{constructor(e,t,s){this._workerCount=0,this.name=e,this.description=t,this.value=new i.ValueContainer,this.value.setAdditiveModifier(this,s),this.onWorkerCountChange=r.ObservableFactory.createWith1Argument()}get workerCount(){return this._workerCount}set workerCount(e){this._workerCount=e,this.onWorkerCountChange.notify(e)}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(3),r=s(19),o=s(4),n=s(5);class a extends i.GameSystem{constructor(e){super(),this.name="Buildings",this.buildings=[],this.game=e}addBuilding(e,t,s,i,o,n,a,u,c){this.buildings.push(new r.Building(e,t,s,i,o,n,a,u,c))}init(){this.addBuilding("Hut","Allows another worker to join your village",n.ResourceValue.fromArray([o.ResourceType.Wood,100]),n.ResourceValue.fromArray([o.ResourceType.Wood,20]),n.ResourceValue.fromArray([o.ResourceType.Wood,1.2]),1e3,500,null,e=>{this.game.workerSystem.totalWorkerCount.setAdditiveModifier(e,e.amount)})}buyBuilding(e){const t=e.costOfNext.getAllAsResourceValues();this.game.resourceSystem.hasResources(t)&&(this.game.resourceSystem.payResources(t),e.startBuilding())}update(e){this.buildings.forEach(t=>{t.isBuildingNext&&(t.buildTimeRemaining-=e,t.buildTimeRemaining<=0&&t.finishBuilding())})}}t.BuildingSystem=a},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(1),r=s(20),o=s(2);t.Building=class{constructor(e,t,s,n,a,u,c,l,d){this.isBuildingNext=!1,this.amount=0,this.name=e,this.description=t,this.costOfNext=new r.ResourceValueContainerSet(s),this.timeToBuildNext=new o.ValueContainer(u),this.additiveCostPerBuilding=n,this.multiplicativeCostPerBuilding=a,this.additiveTimeToBuildPerBuilding=c,this.multiplicativeTimeToBuildPerBuilding=l,this.onUpdateAmount=i.ObservableFactory.createWith1Argument(),this.onUpdateAmount.addSubscription(this,d),this.onBuildingStarted=i.ObservableFactory.createWith1Argument()}refreshNextBuilding(){this.refreshCostOfNextBuilding(),this.refreshTimeToBuildNextBuilding()}refreshCostOfNextBuilding(){this.additiveCostPerBuilding.forEach(e=>{const t=e.value*this.amount;this.costOfNext.setAdditiveModifier(this,e.resourceType,t)}),this.multiplicativeCostPerBuilding.forEach(e=>{const t=Math.pow(e.value,this.amount);this.costOfNext.setMultiplicativeModifier(this,e.resourceType,t)})}refreshTimeToBuildNextBuilding(){if(this.additiveTimeToBuildPerBuilding){const e=this.additiveTimeToBuildPerBuilding*this.amount;this.timeToBuildNext.setAdditiveModifier(this,e)}if(this.multiplicativeTimeToBuildPerBuilding){const e=Math.pow(this.multiplicativeTimeToBuildPerBuilding,this.amount);this.timeToBuildNext.setMultiplicativeModifier(this,e)}}startBuilding(){this.isBuildingNext=!0,this.buildTimeRemaining=this.timeToBuildNext.value,this.onBuildingStarted.notify(this)}finishBuilding(){this.amount++,this.isBuildingNext=!1,this.refreshNextBuilding(),this.onUpdateAmount.notify(this)}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(21),r=s(5);t.ResourceValueContainerSet=class{constructor(e){this.resourceValueContainers=e.map(e=>new i.ResourceValueContainer(e.resourceType,e.value)),this.resourceValueContainerMap=new Map,this.resourceValueContainers.forEach(e=>this.resourceValueContainerMap.set(e.resourceType,e))}findOrCreateResourceValueContainer(e){let t=this.resourceValueContainerMap.get(e);return t||(t=new i.ResourceValueContainer(e),this.resourceValueContainers.push(t),this.resourceValueContainerMap.set(e,t)),t}setAdditiveModifier(e,t,s){this.findOrCreateResourceValueContainer(t).value.setAdditiveModifier(e,s)}setMultiplicativeModifier(e,t,s){this.findOrCreateResourceValueContainer(t).value.setMultiplicativeModifier(e,s)}getAll(){return this.resourceValueContainers}getAllAsMap(){return this.resourceValueContainerMap}getAllAsResourceValues(){return this.resourceValueContainers.map(e=>new r.ResourceValue(e.resourceType,e.value.value))}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(2);t.ResourceValueContainer=class{constructor(e,t){this.resourceType=e,this.value=new i.ValueContainer(t)}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0);class r extends i.Component{render(){return i.createElement("div",{id:"header"},i.createElement("span",{className:"title-container"},i.createElement("span",{className:"title"},"Quiet Village"),i.createElement("span",{className:"version-number"},"v",this.props.versionNumber)),i.createElement("span",{className:"button btn-new-game",onClick:this.props.onNewGameClick},"New game"))}}t.UIHeader=r},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(24),o=s(26),n=s(30),a=s(32);class u extends i.Component{renderGameSystem(){if(!this.state||!this.state.selectedGameSystem||!this.state.selectedGameSystem.isUnlocked)return null;switch(this.state.selectedGameSystem){case this.props.game.buildingSystem:return i.createElement(o.UIBuildings,{game:this.props.game});case this.props.game.workerSystem:return i.createElement(r.UIJobList,{game:this.props.game});default:return null}}render(){return i.createElement("div",{id:"body"},i.createElement("span",{id:"tabs-and-tab-content-container"},i.createElement(a.UIGameSystemTabs,{game:this.props.game,onSelected:e=>this.setState({selectedGameSystem:e})}),i.createElement("span",{id:"tab-content"},this.renderGameSystem())),i.createElement(n.UIResources,{game:this.props.game}))}}t.UIBody=u},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(25);class o extends i.Component{constructor(e){super(e)}render(){return i.createElement("ul",null,this.props.game.workerSystem.jobs.map(e=>i.createElement(r.UIJobLine,{key:e.name,game:this.props.game,job:e})))}}t.UIJobList=o},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0);class r extends i.Component{constructor(e){super(e),this.state={name:this.props.job.name,workerCount:this.props.job.workerCount},this.props.job.onWorkerCountChange.addSubscription(this,e=>this.setState({workerCount:e}))}addWorker(){const e=this.props.job.workerCount+1;this.setWorkers(e)}removeWorker(){const e=this.props.job.workerCount-1;this.setWorkers(e)}setWorkers(e){this.props.game.workerSystem.setWorkerCountOnJob(this.props.job,e)}render(){return i.createElement("li",{key:this.state.name},i.createElement("span",null,this.state.name),i.createElement("span",null,this.state.workerCount),i.createElement("input",{type:"button",onClick:()=>this.addWorker(),value:"Add"}),i.createElement("input",{type:"button",onClick:()=>this.removeWorker(),value:"Remove"}))}}t.UIJobLine=r},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(27);class o extends i.Component{constructor(e){super(e)}render(){return i.createElement("ul",null,this.props.game.buildingSystem.buildings.map(e=>i.createElement(r.UIBuilding,{key:e.name,game:this.props.game,building:e})))}}t.UIBuildings=o},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(28),o=s(29);class n extends i.Component{constructor(e){super(e),this.props.building.onUpdateAmount.addSubscription(this,e=>this.forceUpdate()),this.props.game.onUpdate.addSubscription(this,()=>this.forceUpdate())}buy(){this.props.game.buildingSystem.buyBuilding(this.props.building)}getAmountText(){return this.props.building.amount>0?"("+this.props.building.amount+")":""}render(){return i.createElement("li",{key:this.props.building.name,className:"building"},i.createElement("span",{className:"name-and-image-container"},i.createElement("span",{className:"name"},this.props.building.name+this.getAmountText()),i.createElement("img",{src:`./img/buildings/${this.props.building.name.toLocaleLowerCase()}.png`})),i.createElement("span",{className:"description-container"},this.props.building.isBuildingNext&&i.createElement(o.UIProgressBar,{min:0,max:this.props.building.timeToBuildNext.value,current:this.props.building.buildTimeRemaining}),i.createElement("span",{className:"description"},this.props.building.description)),i.createElement(r.UIBuildingCost,{onClick:()=>this.buy(),building:this.props.building}))}}t.UIBuilding=n},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(6),o=s(7);class n extends i.Component{constructor(e){super(e),this.props.building.onUpdateAmount.addSubscription(this,e=>this.forceUpdate())}render(){return i.createElement(r.GameContext.Consumer,null,e=>i.createElement("ul",{className:"resources",onClick:this.props.onClick},this.props.building.costOfNext.getAll().map(t=>i.createElement("li",{className:"resource",key:t.resourceType},i.createElement("span",{className:"type"},e.resourceSystem.getResource(t.resourceType).name),i.createElement("span",{className:"value"},o.NumberFormatter.Format(t.value.value,0,0,!0))))))}}t.UIBuildingCost=n},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0);class r extends i.Component{getFillPercentage(){return 100*(this.props.max-this.props.current)/(this.props.max-this.props.min)}render(){return i.createElement("span",{className:"progress-bar"},i.createElement("span",{className:"bar",style:{width:this.getFillPercentage()+"%"}}))}}t.UIProgressBar=r},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(31);class o extends i.Component{constructor(e){super(e);const t=()=>this.props.game.resourceSystem.resources.filter(e=>e.isUnlocked);this.state={resources:t()},this.props.game.onUpdate.addSubscription(this,()=>this.setState({resources:t()}))}render(){return i.createElement("ul",{id:"resource-list"},this.state.resources.map(e=>i.createElement(r.UIResource,{key:e.name,resource:e})))}}t.UIResources=o},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(7);class o extends i.Component{render(){return i.createElement("li",{className:"resource-line"},i.createElement("span",null,i.createElement("span",{className:"name"},this.props.resource.name),i.createElement("span",{className:"increase-per-second"},"(",r.NumberFormatter.Format(this.props.resource.income.value,2,2),"/s)")),i.createElement("span",null,i.createElement("span",{className:"amount"},r.NumberFormatter.Format(this.props.resource.amount,2,2)),this.props.resource.hasCap?i.createElement("span",null," / ",r.NumberFormatter.Format(this.props.resource.cap.value,2,2)):null))}}t.UIResource=o},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(33);class o extends i.Component{constructor(e){super(e),this.allGameSystems=[e.game.workerSystem,e.game.buildingSystem],this.allGameSystems.forEach(e=>e.onUnlocked.addSubscription(this,()=>this.updateGameSystems())),this.gameSystems=this.getUnlockedGameSystems()}getUnlockedGameSystems(){return this.allGameSystems.filter(e=>e.isUnlocked)}updateGameSystems(){this.gameSystems=this.allGameSystems.filter(e=>e.isUnlocked),this.forceUpdate()}selectGameSystem(e){this.selectedGameSystem=e,this.props.onSelected(e),this.forceUpdate()}componentDidMount(){this.selectGameSystem(this.props.game.workerSystem)}render(){return i.createElement("ul",{id:"tabs"},this.gameSystems.map(e=>i.createElement(r.UIGameSystemTab,{key:e.name,gameSystem:e,isSelected:e===this.selectedGameSystem,onSelected:()=>this.selectGameSystem(e)})))}}t.UIGameSystemTabs=o},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0);class r extends i.Component{render(){return i.createElement("li",{className:`tab ${this.props.isSelected?"selected":""}`,onClick:this.props.onSelected},i.createElement("img",{src:`./img/tabs/${this.props.gameSystem.name.toLocaleLowerCase()}.png`}),i.createElement("span",null,this.props.gameSystem.name))}}t.UIGameSystemTab=r}]);
//# sourceMappingURL=main.js.map