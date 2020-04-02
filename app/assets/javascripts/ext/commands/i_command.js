//= require ext/commands/commands

/**
 * Interface which provides a blueprint for all classes that want to be commands. Commands could be executed and then redo/undo could be called on them. We leave it entirely to the imagination of the developer to decide on whether his command should keep track of the changes made by it via a delta, for example, and how that delta is implemented.
 *
 * @export
 * @interface
 * @author  Dimitar Lukanov
 */
IS.Commands.ICommand = function() {};

/**
 * Execute the command
 */
IS.Commands.ICommand.prototype.execute = function() {};

/**
 * Redo the command
 */
IS.Commands.ICommand.prototype.redo = function() {};

/**
 * Undo the command
 */
IS.Commands.ICommand.prototype.undo = function() {};

/**
 * @enum {string}
 */
IS.Commands.ICommand.ACTIONS = {
  EXECUTE: "execute",
  UNDO: "undo",
  REDO: "redo"
};
