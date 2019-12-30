//= require is
//= require core/extension
//= require core/is_core
//= require util/tree_util
//= require ext/steps-tree/step_data
//= require ext/steps-tree/loaded_event
//= require ext/global-iterator/ready_event
//= require ext/commands/step_command
//= require ext/commands/steps_loaded_caller
//= require ext/commands/executed_event
//= require protects
describe("IS.Commands.StepsLoadedCaller",function() {

	class DummyStepsLoadedCallerExtension extends IS.Extension {

		constructor() {
			super();
		}
		
		onStepsTreeLoaded() {
			this.stepsTreeLoaded = DummyStepsLoadedCallerExtension.ORDER++;
			this.getCore().scheduleNotify({'iteratorReady': new IS.GlobalIterator.ReadyEvent(null, null)})
		}

		onIteratorReady() {
			this.iteratorReady = DummyStepsLoadedCallerExtension.ORDER++;
		}

		onCommandsExecuted() {
		}

	}
	DummyStepsLoadedCallerExtension.ORDER = 0;

	it("calls stepsTreeLoaded for all extensions that listen to stepsTreeLoaded but not to commandsExecuted. In this way extensions could reload their view if they can not handle delta change of the view.",function(){
		this.extension1 = new DummyStepsLoadedCallerExtension();
		this.extension2 = new DummyStepsLoadedCallerExtension();
		DummyStepsLoadedCallerExtension.ORDER=0
		this.extConf1 = IS.ExtensionDef.CreateByExtensionConf({
			'extension': this.extension1,
			'events': {
				'stepsTreeLoaded': {
					receivesWith: this.extension1.onStepsTreeLoaded,
					class: Object
				},
				'commandsExecuted': {
					receivesWith: this.extension1.onCommandsExecuted,
					class: Object
				},
				'iteratorReady': {
					class: Object
				}
			},
		})
		this.extConf2 = IS.ExtensionDef.CreateByExtensionConf({
			'extension': this.extension2,
			'events': {
				'stepsTreeLoaded':{
					receivesWith: this.extension2.onStepsTreeLoaded
				},
				'iteratorReady': {
					receivesWith: this.extension2.onIteratorReady
				},
			}
		})

		this.callerExtension = new IS.Commands.StepsLoadedCaller()
		this.extConf3 = IS.ExtensionDef.CreateByExtensionConf({
			'extension': this.callerExtension,
			'events': {
				'commandsExecuted': {
					receivesWith: this.callerExtension.onCommandsExecuted
				} 
			}
		})
		
		this.isCore = new IS.Core([this.extConf1,this.extConf2, this.extConf3]);
		this.isCore.init();
		const command = new IS.Commands.StepCommand(new IS.StepsTree.StepData("1"))
		const extDefs = this.isCore.getExtensionDefsListeningFor({commandsExecuted: true})
		this.isCore.scheduleNotify({'commandsExecuted': new IS.Commands.ExecutedEvent([command])},extDefs)

		expect(this.extension2.stepsTreeLoaded).toEqual(0)
	})

})