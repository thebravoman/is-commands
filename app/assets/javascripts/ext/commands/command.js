//= require ext/commands/commands
//= require ext/commands/deltas/i_delta

/**
 * Base class for all commands. Commands could be executed and then redo/undo could be called on them. Implementers of this interface should also bear in mind that it is highly recommended that the
 *
 * @export
 * @author  Dimitar Lukanov
 */
IS.Commands.Command = class {
  constructor() {
    /**
     * @type {IS.Commands.Deltas.IDelta}
     */
    this._delta;
  }

  /**
   * Execute the command
   */
  execute() {}

  /**
   * Redo the command
   */
  redo() {}

  /**
   * Undo the command
   */
  undo() {}

  /**
   * Returns the delta associated with the command.
   * @return {IS.Commands.Deltas.IDelta}
   */
  getDelta() {
    return this._delta;
  }
};

IS.Commands.Command.ACTIONS = {
  EXECUTE: 1,
  REDO: 2,
  UNDO: 3
};
