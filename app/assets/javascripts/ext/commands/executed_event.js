/**
 * Data object for when the event of 'commandsExecuted' has occurred.
 *
 * Listeners to this event should update accordingly and if possible fast without reloading everything.
 *
 * @export
 * @tutorial tutorial-50-commands-framework
 * @author Kiril Mitov
 */
IS.Commands.ExecutedEvent = class {

	/**
	 * @param {Array<IS.Commands.StepCommand>} commands list of commands for this event in order that they are applied
	 * @param {string} action the action of execute/undo/redo that was done on the commands in this event.
	 */
	constructor(commands,action) {
		/**
		 * @private
		 * @type {Array<IS.Commands.StepCommand>}
		 */
		this._commands = commands

		/**
		 * @private
		 * @type {string}
		 */
		this._action = action
	}

	/**
	 * @export
	 * @return {Array<IS.Commands.StepCommand>} array of commands store in this event
	 */
	getCommands() {
		return this._commands
	}

	/**
	 * @export
	 * @return {string}
	 */
	getAction() {
		return this._action;
	}
	
}