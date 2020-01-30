//= require ext/steps-tree/step_data
//= require ext/commands/step_command
//= require ext/commands/deltas/step_reorder_delta

/**
 * Command for reordering a step in the step tree. You can place the step under a new parent on a specified
 * position in the parent childrens array. To change the order in the same parent pass the new position 
 * and the same parent.
 *
 * @author Kiril Mitov
 * @export
 */
IS.Commands.StepReorderCommand = class extends IS.Commands.StepCommand {

	/**
	 * <p>The steps must be part of a tree where each node knows its parent (eg. responds to '.parent') 
	 * and each parent knows it's children (eg. responds to '.children'). 
	 * 'step' must have a parent. Otherwise it is the rootNode and we can not move the rootNode in the trree itself.</p>
	 *  
	 * @param  {IS.StepsTree.StepData} step the step which parent should be changed   
	 * @param  {IS.StepsTree.StepData} newParent of the step. The parent could be the same which is useful for changing the order in the same parent.
	 * @param {number} position zero based position in which to put the new steps in the children of the parent.
	 */
	constructor(step, newParent, position) {
		super(step);
		IS.ErrorsUtil.AssertNotNull(step.parent);
		IS.ErrorsUtil.AssertNotNull(newParent);
		/**
		 * @private
		 * @type {IS.StepsTree.StepData}
		 */
		this._newParent = newParent;

    /**
     * @private
     * @type {IS.StepsTree.StepData}
     */
    this._oldParent;

		/**
		 * @private
		 * @type {number}
		 */
		this._newPosition = position;

		/**
		 * @private
		 * @type {number}
		 */
		this._oldPosition;
	}

	/**
	 * @override
	 */
	execute() {
		this._oldPosition = this.getStep().parent.children.indexOf(this.getStep());
		this._oldParent = this.getStep().parent;

    this.toggleParent(this._newParent, this._newPosition);
    this.generateDelta(this._newParent, this._newPosition);
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
		this.toggleParent(this._oldParent, this._oldPosition);
    this.generateDelta(this._oldParent, this._oldPosition);
	}

	/**
	 * @private
	 * @param  {IS.StepsTree.StepData} newParent  
	 * @param  {number} newPosition 
	 */
	toggleParent(newParent, newPosition) {
    this.getStep().parent.children.splice(this.getStep().parent.children.indexOf(this.getStep()),1);
    newParent.children.splice(newPosition, 0, this.getStep());
    this.getStep().parent=newParent;
	}

  /**
   * @override
   *
   * @param {IS.StepsTree.StepData|undefined|null} newParent
   * @param {number} newPosition
   */
  generateDelta(newParent, newPosition) {
    const newDelta = new IS.Commands.Deltas.StepReorderDelta(
      this.getStep(),
      newParent,
      newPosition
      );

    this.setDelta(newDelta);
  }
}