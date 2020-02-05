//= require ext/steps-tree/step_data
//= require ext/commands/step_command
//= require ext/commands/deltas/step_delete_delta
//= require ext/commands/deltas/step_create_delta

/**
 * Command for deleting a step from the step tree.
 *
 * @author Dimitar Lukanov
 * @export
 */
IS.Commands.StepDeleteCommand = class extends IS.Commands.StepCommand {
  /**
   * <p>The steps must be part of a tree where each node knows its parent (eg. responds to '.parent')
   * and each parent knows it's children (eg. responds to '.children').
   * 'step' must have a parent. Otherwise it is the true root node and we can not delete the true root node from the tree.</p>
   *
   * @param  {IS.StepsTree.StepData} step the step which parent should be changed
   * @param  {IS.StepsTree.StepData} newParent of the step. The parent could be the same which is useful for changing the order in the same parent.
   * @param {number} position zero based position in which to put the new steps in the children of the parent.
   */
  constructor(step) {
    super(step);
    IS.ErrorsUtil.AssertNotNull(step.parent);
  }

  /**
   * @override
   */
  execute() {
    const parent = this.getStep().parent;
    const position = this.getStep().parent.children.indexOf(this.getStep());
    parent.children.splice(position, 1);

    const newDelta = new IS.Commands.Deltas.StepDeleteDelta(this.getStep(), parent, position);
    this.setDelta(newDelta);
  }

  /**
   * @override
   */
  redo() {
    this.execute();
  }

  /**
   * @override
   */
  undo() {
    const delta = this.getDelta();
    const oldPosition = delta.getPosition();
    const oldParent = delta.getParent();

    oldParent.children.splice(IS.Commands.Deltas.StepCreateDelta, oldPosition, 0, this.getStep());

    const newDelta = new IS.Commands.Deltas.StepCreateDelta(this.getStep(), oldParent, oldPosition);
    this.setDelta(newDelta);
  }
};
