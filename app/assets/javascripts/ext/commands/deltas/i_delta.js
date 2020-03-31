//= require ext/commands/deltas/deltas

/**
 * Interface for classes that keep the changes made by subclasses of the {IS.Commands.Command} class.
 *
 * This interface exists because subclasses of the {IS.Commands.Command} class have to be able to keep a state of the changes they've made, if there were any.
 * The reason why a command should have a delta associated with it is so it can revert (by calling the undo method) or redo (by calling the redo method) the changes that were commited by executing it (by calling the execute method).
 * What the delta contains and how it keeps that state is entirely up to the developer to decide.
 *
 *
 * @export
 * @interface
 * @author  Dimitar Lukanov
 */
IS.Commands.Deltas.IDelta = function() {};
