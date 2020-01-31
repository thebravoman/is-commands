//= require ext/commands/deltas/deltas
//= require ext/commands/deltas/step_delta

/**
 * Delta that contains the changes made to a step via the {@link IS.Commands.StepReorderCommand}.
 *
 * The getStep, getParent, getPosition just have a different semantic meaning from the other deltas.
 *
 * - getStep() returns the step we've just moved.
 * - getParent() returns the steps new parent step.
 * - getPosition() returns the position in which we put the step in, in the children attribute of the new parent step
 *
 * @export
 * @author Dimitar Lukanov
 */
IS.Commands.Deltas.StepReorderDelta = class extends IS.Commands.Deltas.StepDelta {};
