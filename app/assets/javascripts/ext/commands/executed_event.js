//= require ext/commands/commands
//= require ext/commands/command
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
   * @param {Array<IS.Commands.Command>} commands list of commands for this event in order that they are applied
   * @param {number} action the action of execute/undo/redo that was done on the commands in this event.
   */
  constructor(commands, action) {
    IS.ErrorsUtil.AssertNotNull(commands);
    IS.ErrorsUtil.AssertIsArray(commands);
    IS.ErrorsUtil.AssertArrayWithInstances(commands, IS.Commands.Command);

    /**
     * @private
     * @type {Array<IS.Commands.Command>}
     */
    this._commands = commands;

    /**
     * @private
     * @type {number}
     */
    this._action = action;
  }

  /**
   * @export
   * @return {Array<IS.Commands.Command>} array of commands store in this event
   */
  getCommands() {
    return this._commands;
  }

  /**
   * @export
   * @return {number}
   */
  getAction() {
    return this._action;
  }
};
