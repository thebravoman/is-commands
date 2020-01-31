//= require ext/commands/deltas/deltas
//= require ext/commands/deltas/step_delta

/**
 * Delta that contains the information for which step we've deleted.
 *
 * The getStep, getParent, getPosition just have a different semantic meaning from the other deltas.
 *
 * - getStep() returns the step we've just deleted.
 * - getParent() returns the parent of the step that we just deleted.
 * - getPosition() returns the position in which the was in the children attribute of the parent step
 *
 * @export
 * @author Dimitar Lukanov
 */
IS.Commands.Deltas.StepDeleteDelta = class extends IS.Commands.Deltas.StepDelta {};
