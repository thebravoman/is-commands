//= require ext/commands/deltas/deltas
//= require ext/commands/deltas/step_delta

/**
 * Delta that contains the changes made to a step via the {@link IS.Commands.StepCreateCommand}
 *
 * The getStep, getParent, getPosition just have a different semantic meaning from the other deltas.
 *
 * - getStep() returns the step we've just created.
 * - getParent() returns the new steps parent step.
 * - getPosition() returns the position in which we put the new step in, in the children attribute of the parent step
 *
 * @export
 * @author Dimitar Lukanov
 */
IS.Commands.Deltas.StepCreateDelta = class extends IS.Commands.Deltas.StepDelta {};
