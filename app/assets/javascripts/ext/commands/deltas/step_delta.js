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

    /**
     * @private
     * @type {IS.StepsTree.StepData}
     */
    this._step;

    /**
     * @private
     * @type {IS.StepsTree.StepData}
     */
    this._parent;

    /**
     * @private
     * @type {number}
     */
     this._position;
  }

  /**
   * Returns the step we've modified
   * @export
   */
  getStep() {
    return this._step;
  }

  /**
   * Returns the parent we've modified
   * @export
   */
  getParent() {
    return this._parent;
  }

  /**
   * Returns the position we've modified among the parents' children
   * @export
   */
  getPosition() {
    return this._position;
  }
}