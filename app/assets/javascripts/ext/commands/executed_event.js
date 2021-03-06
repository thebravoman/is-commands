//= require ext/commands/commands
//= require ext/commands/i_command
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
   * @param {Array<IS.Commands.ICommand>} commands list of commands for this event in order that they are applied
   * @param {string} action the [action]{@link IS.Command.ICommand#ACTIONS} of execute/undo/redo that was done on the commands in this event.
   */
  constructor(commands, action) {
    IS.ErrorsUtil.AssertNotNull(commands);
    IS.ErrorsUtil.AssertIsArray(commands);
    IS.ErrorsUtil.AssertObjectsImplementInterface(commands, IS.Commands.ICommand);

    /**
     * @private
     * @type {Array<IS.Commands.ICommand>}
     */
    this._commands = commands;

    /**
     * @private
     * @type {string}
     */
    this._action = action;
  }

  /**
   * @export
   * @return {Array<IS.Commands.ICommand>} array of commands store in this event
   */
  getCommands() {
    return this._commands;
  }

  /**
   * @export
   * @return {string}
   */
  getAction() {
    return this._action;
  }
};

/**
 * @enum {string}
 */
IS.Commands.ExecutedEvent.ACTIONS = {
  EXECUTE: "execute",
  UNDO: "undo",
  REDO: "redo"
};
