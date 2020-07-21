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
    if (this.getUndoElement()) {
      this.getUndoElement().addEventListener("click", () => {
        this._historyService.undo();
        this.setDisabledStyles();
      });
    }
    if (this.getRedoElement()) {
      this.getRedoElement().addEventListener("click", () => {
        this._historyService.redo();
        this.setDisabledStyles();
      });
    }
    this.setDisabledStyles();
  }

  /**
   * @private
   */
  setDisabledStyles() {
    if (this.getUndoElement()) {
      this.getUndoElement().disabled = this._historyService.getUndoCount() == 0;
    }
    if (this.getRedoElement()) {
      this.getRedoElement().disabled = this._historyService.getRedoCount() == 0;
    }
  }

  /**
   * @private
   * @return {Element}
   */
  getUndoElement() {
    return document.getElementById("is-undo");
  }

  /**
   * @private
   * @return {Element}
   */
  getRedoElement() {
    return document.getElementById("is-redo");
  }
};
