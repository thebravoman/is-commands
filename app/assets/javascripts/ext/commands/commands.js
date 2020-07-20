if (typeof IS.Commands == "undefined") {
  /**
   * <h2>Overview</h2>
   * The commands framework provides an abstraction for capsulating logic that changes the instructions. T
   * his abstraction allows for undo/redo of the changes.
   *
   * <h2>Events declared</h2>
   * <ul>
   *  <li>
   *  <code>
   *  <pre>
   *    commandExecuted: {
   *      "class": {@link IS.Commands.ExecutedEvent},
   *      "apiName": 'commandExecuted'
   *    }
   *  </pre>
   *  </code>
   *  </li>
   * </ul>
   *
   * <h2>Extensions</h2>
   *
   * <h3>{@link IS.Commands.History}</h3>
   * Register with:
   * ext/commands/register_history.js
   *
   * <h3>{@link IS.Commands.UndoRedo}</h3>
   * Register with:
   * ext/commands/register_undo_redo.js
   *
   * <h2>Service Points</h2>
   * <p>The extension provides the following service points</p>
   * <ul>
   * <li>
   * <code>
   * <pre>
   *  services: [{
   *    type: ""com.axlessoft.ai3d.is.commands.history"",
   *    interface: {@link IS.Commands.History},
   *  }
   * </pre>
   * </code>
   * </li>
   * </ul>
   *
   * @author Kiril Mitov
   * @tutorial tutorial-50-commands-framework
   * @namespace
   */
  IS.Commands = {};
}
