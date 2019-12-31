//= require ext/steps-tree/loaded_event
//= require ext/commands/commands
/**
 * <p>When this extension receives a 'commandsExecuted' it will check all the extensions
 * that are listening for 'stepsTreeLoaded' and if they are not listening 
 * for 'commandsExecuted' it will call their 'stepsTreeLoaded' method.</p>
 *
 * <p>This gives the extensions a chance to reload without understanding about
 * the editor. For example IS.ProgressBar does not have to understand about 'commandsExecuted'. It listens
 * for 'iteratorReady' and thats it. If on the other hand an extension decides to fine tune and understand the editor
 * than it can. It should register to 'commandsExecuted'</p>
 *
 * @tutorial tutorial-50-commands-framework
 * @author Kiril Mitov 
 */
IS.Commands.StepsLoadedCaller = class extends IS.Extension {

	constructor() {
		super();
	}
	
	/**
	 * @param  {IS.Commands.ExecutedEvent} event 
	 */
	onCommandsExecuted(event) {
		const extConfs = this.getCore().getExtensionDefsListeningFor({stepsTreeLoaded:true, commandsExecuted:false})
		const rootStep = /** @type {IS.StepsTree.StepData} */ (IS.TreeUtil.GetRoot(event.getCommands()[0].getStep()))
		this.getCore().scheduleNotify({stepsTreeLoaded: new IS.StepsTree.LoadedEvent(rootStep)}, extConfs)
	}

}