//= require ext/commands/history
//= require ext/commands/executed_event
//= require ext/commands/i_humanizable

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
      });
    }
    if (this.getRedoElement()) {
      this.getRedoElement().addEventListener("click", () => {
        this._historyService.redo();
      });
    }
    this.setButtonsStyle();
  }

  /**
   * @private
   * @param  {IS.Commands.ExecutedEvent} event
   */
  onCommandsExecuted(event) {
    this.setButtonsStyle();
  }

  /**
   * @private
   */
  setButtonsStyle() {
    this.updateButtonElement(this.getUndoElement(), this._historyService.getUndoCount() == 0, -1);
    this.updateButtonElement(this.getRedoElement(), this._historyService.getRedoCount() == 0, 0);
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

  /**
   * @private
   * @param  {Element} element         [description]
   * @param  {boolean} disabled        [description]
   * @param  {number} commandPosition [description]
   */
  updateButtonElement(element, disabled, commandPosition) {
    if (element) {
      element.disabled = disabled;
      if (!disabled) {
        element.title = this.getCommandsTitle(commandPosition);
      }
    }
  }

  /**
   * @private
   * @param {number} relativePosition
   * @return {string} the title of the commands
   */
  getCommandsTitle(relativePosition) {
    const commands = this._historyService.getCommandArrays()[this._historyService.getPosition() + relativePosition];
    return commands
      .map(command => {
        const humanizable = /** @type {IS.Commands.IHumanizable} */ (command);
        return humanizable.toHumanized ? humanizable.toHumanized()["title"] : "(unhumanized command)";
      })
      .join("; ");
  }
};
