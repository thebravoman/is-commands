//= require ext/commands/commands

/**
 * Interface for Commands.
 * A command capsulates the behaviour and the and the state of a change in a model.
 *
 * @export
 * @interface
 */
IS.Commands.ICommand = function() {};

/**
 * Execute the command
 * The method should be called **only onse**. It allows for the command
 * to save the state for when it will be undone
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
