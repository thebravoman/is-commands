//= require ext/steps-tree/step_data
//= require ext/commands/deltas/deltas

/**
 * Base class for deltas that are created when changing the steps with {@link IS.Commands.StepCommand} commands.
 *
 * @export
 * @author  Dimitar Lukanov
 */
IS.Commands.Deltas.StepDelta = class {
  /**
   * @param {IS.StepsTree.StepData} step
   * @param {IS.StepsTree.StepData} parent
   * @param {number} position
   */
  constructor(step, parent, position) {
    IS.ErrorsUtil.AssertNotNull(step);
    IS.ErrorsUtil.AssertNotNull(parent);
    IS.ErrorsUtil.AssertNotNull(position);
    /**
     * @private
     * @type {IS.StepsTree.StepData}
     */
    this._step = step;

    /**
     * @private
     * @type {IS.StepsTree.StepData}
     */
    this._parent = parent;

    /**
     * @private
     * @type {number}
     */
    this._position = position;
  }

  /**
   * Returns the step we've modified
   * @export
   * @return {IS.StepsTree.StepData}
   */
  getStep() {
    return this._step;
  }

  /**
   * Returns the parent we've modified
   * @export
   * @return {IS.StepsTree.StepData}
   */
  getParent() {
    return this._parent;
  }

  /**
   * Returns the position we've modified among the parents' children. This could be:
   * - the position of the step we want to remove
   * - the position in which to put a new step in
   * - the position we want to move an existing step to or from
   *
   * Check documentation of the specific deltas for what this position means
   *
   * @export
   * @return {number}
   */
  getPosition() {
    return this._position;
  }
};
