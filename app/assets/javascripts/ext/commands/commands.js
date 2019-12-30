if(typeof IS.Commands == 'undefined') {
	/**
	 * <h2>Overview</h2>
	 * The commands framework provides an abstraction for capsulating logic that changes the instructions. This abstraction allows for undo/redo of the changes.
	 *
	 * <h2>Events broadcasted</h2>
	 * <ul>
	 * 	<li>- 'commandExecuted' - broadcasted after a command was executed/undone/redone. See {@link IS.Commands.ExecutedEvent}</li>
	 * </ul>
	 *
	 * @author Kiril Mitov
	 * @tutorial tutorial-50-commands-framework
	 * @namespace
	 */
	IS.Commands = {}
}
