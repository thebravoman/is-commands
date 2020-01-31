//= require ext/steps-tree/step_data
//= require ext/commands/step_command
//= require ext/commands/deltas/step_create_delta
//= require ext/commands/deltas/step_delete_delta

/**
 * Command for creating a step in the steps tree.
 *
 * @author Dimitar Lukanov
 * @export
 */
IS.Commands.StepCreateCommand = class extends IS.Commands.StepCommand {
  /**
   *
   * @param  {!*} stepID the id of the new step
   * @param  {!IS.StepsTree.StepData} parent parent step of the new step.
   * @param {!number} position zero based position in which to put the new steps in the children array of the parent step.
   */
  constructor(stepID, parent, position) {
    IS.ErrorsUtil.AssertNotNull(stepID);
    IS.ErrorsUtil.AssertNotNull(parent);
    IS.ErrorsUtil.AssertNotNull(position);

    super(new IS.StepsTree.StepData(stepID));

    /**
     * @type {IS.StepsTree.StepData|undefined|null}
     */
    this._parent = parent;

    /**
     * @type {!number}
     */
    this._position = position;
  }

  /**
   * @override
   */
  execute() {
    this._parent.children.splice(this._position, 0, this._step);
    const newDelta = new IS.Commands.Deltas.StepCreateDelta(this.getStep(), this._parent, this._position);
    this.setDelta(newDelta);
  }

  /**
   * @override
   */
  undo() {
    this._parent.children.splice(this._position, 1);
    const newDelta = new IS.Commands.Deltas.StepDeleteDelta(this.getStep(), this._parent, this._position);
    this.setDelta(newDelta);
  }

  /**
   * @override
   */
  redo() {
    this.execute();
  }
};