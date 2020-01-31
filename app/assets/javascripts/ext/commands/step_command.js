//= require ext/steps-tree/step_data
//= require ext/commands/commands
//= require ext/commands/deltas/step_delta

/**
 * Base class for commands that are changing the steps. Comands could be executed and then redu/undo could be called on them
 *
 * @export
 * @tutorial tutorial-50-commands-framework
 * @author  Kiril Mitov
 */
IS.Commands.StepCommand = class {
  /**
   * @param  {!IS.StepsTree.StepData} step
   */
  constructor(step) {
    IS.ErrorsUtil.AssertNotNull(step);
    /**
     * @private
     * @type {!IS.StepsTree.StepData}
     */
    this._step = step;

    /**
     * @private
     * @type {IS.Commands.Deltas.StepDelta}
     */
    this._delta;
  }

  /**
   * Execute the command
   *
   * @export
   */
  execute() {}

  /**
   * Redo the command
   *
   * @export
   */
  redo() {}

  /**
   * Undo the command and all modifications on this step
   *
   * @export
   */
  undo() {}

  /**
   * @export
   * @return {!IS.StepsTree.StepData} the step over which the action is executed
   */
  getStep() {
    return this._step;
  }

  /**
   * Returns the delta representing the changes made to the structure by this command
   *
   * @export
   * @return {IS.Commands.Deltas.StepDelta}
   */
  getDelta() {
    return this._delta;
  }

  /**
   *  @protected
   *  @param {IS.Commands.Deltas.StepDelta} delta
   */
  setDelta(delta) {
    this._delta = delta;
  }
};
