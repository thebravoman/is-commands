//= require ext/commands/history
/**
 * <p>Undo/Redo buttons</p>
 *
 * @see  IS.Commands.ExecutedEvent
 * @see  IS.Commands.ICommand
 * @tutorial tutorial-50-commands-framework
 * @export
 * @author Kiril Mitov
 */
IS.Commands.UndoRedo = class extends IS.Extension {
  constructor() {
    super();

    /**
     * @private
     * @type {IS.Commands.History}
     */
    this._historyService;
  }

  /**
   * @ignore
   * @param  {IS.CoreInitEvent} event
   */
  onCoreInit(event) {
    this._historyService = /** @type {IS.Commands.History} */ (this.getCore()
      .getExtensionDefsForService(IS.Commands.History.SERVICE_TYPE)[0]
      .getExtension());
    if (document.getElementById("is-undo")) {
      document.getElementById("is-undo").addEventListener("click", () => {
        this._historyService.undo();
      });
    }
    if (document.getElementById("is-redo")) {
      document.getElementById("is-redo").addEventListener("click", () => {
        this._historyService.redo();
      });
    }
  }
};
