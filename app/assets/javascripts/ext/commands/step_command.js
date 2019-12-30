//= require ext/commands/commands
/**
 * Base class for commands that are changing the steps. Comands could be executed and then redu/undo could be called on them
 * 
 * @export
 * @tutorial tutorial-50-commands-framework
 * @author  Kiril Mitov 
 */
IS.Commands.StepCommand = class {

	/**
	 * @param  {IS.StepsTree.StepData} step
	 */
	constructor(step) {
		/**
		 * @private
		 * @type {IS.StepsTree.StepData}
		 */
		this._step= step;
	}

	/**
	 * Execute this command and change the steps in the appropriate way
	 * 
	 * @export
	 */
	execute() {
	}

	/**
	 * Redo the command
	 * 
	 * @export
	 */
	redo() {
	}

	/**
	 * Undo the command and all modifications on this step
	 * 
	 * @export
	 */
	undo() {
	}

	/**
	 * @export
	 * @return {IS.StepsTree.StepData} the step over which the action is executed
	 */
	getStep() {
		return this._step;
	}
}