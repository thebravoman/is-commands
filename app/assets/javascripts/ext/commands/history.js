//= require ext/commands/commands
//= require ext/commands/i_command
//= require ext/commands/executed_event
/**
 * <p>IS.Commands.History is an extension providing the service for keeping the history of executed commands and being
 * able to undo/redo those commands. You can ask the service to execute any class which implements the {@link IS.Commands.ICommand} interface.</p>
 *
 * <p>Axles IS Commands Framework thinks of Commands as simple atomic changes. It is possible to ask the {@link IS.Commands.History} to
 * execute an array of commands. This array of commands will be executed as one chunk. In this way a collection of commands
 * could be executed as a single command. This makes commands simpler. There is no need to implement a command that does a lot of things.
 * One can group the logic into an array of simple commands and {@link IS.Commands.History} will execute this array as one. </p>
 *
 * <p>The other approach to achieve simple commands that could be executed at once
 * is to have a 'CompoundCommand' that groups commands in it. But this will result into a
 * tree structure in the commands, because CompoundCommands could contain other compound commands which, although powerfull
 * will only increase the complexity of the commands and will have little advange. For this reason Axles IS Commands Framework
 * is not using 'Compound Comands'</p>
 *
 * <p>After commands are executed/undone/redone a notification is fired for 'commandsExecuted'. {@link IS.Commands.ExecutedEvent}</p>
 *
 * @example
 * The extension is registered generally as:
 *
 * IS.AxlesIS.GetInstance().addExtensionDefs(() => {
 *   const extension = new IS.Commands.History();
 *   const extensionDef = IS.ExtensionDef.CreateByExtensionConf({
 *     "extension": extension,
 *     "services": [{
 *       type: "com.axlessoft.ai3d.is.commands.history"
 *     }]
 *   });
 *   return [extensionDef];
 * })
 *
 * @example
 * The extension is retrieve as:
 *
 * const commandHistoryConf = scope.getCore().getExtensionDefsForService("com.axlessoft.ai3d.is.commands.history")[0]
 * if(commandHistoryConf) {
 *   const commandHistory= /** @type {IS.Commands.History} *\/ (commandHistoryConf.extension);
 *   commandHistory.undo();
 * }
 *
 * @example
 * Register to receive for commandsExecuted event as
 *
 * IS.AxlesIS.GetInstance().addExtensionDefs(() => {
 *   const extension = new MyExtension();
 *   const extensionDef = IS.ExtensionDef.CreateByExtensionConf({
 *     "extension": extension,
 *     "events": {
 *       "commandsExecuted": {
 *         "receivesWith": extension.onCommandsExecuted
 *       }
 *     }
 *   });
 *   return [extensionDef];
 * })
 *
 * @see  IS.Commands.ExecutedEvent
 * @see  IS.Commands.ICommand
 * @tutorial tutorial-50-commands-framework
 * @export
 * @author Kiril Mitov
 */
IS.Commands.History = class extends IS.Extension {
  constructor() {
    super();

    /**
     * @private
     * @type {number}
     */
    this._position = 0;

    /**
     * @private
     * @type {Array<Array<IS.Commands.ICommand>>}
     */
    this._commandArrays = [];
  }

  /**
   * @export
   * @param  {Array<IS.Commands.ICommand>} commands the array of commands to be executed. They will all be executed but this is considered on execution. On undo all of them will be undone.
   */
  execute(commands) {
    this._commandArrays = this._commandArrays.slice(0, this._position);
    this._commandArrays.push(commands);
    commands.forEach(x => x.execute());
    this._position++;
    this.scheduleNotify(commands, IS.Commands.ExecutedEvent.ACTIONS.EXECUTE);
  }

  /**
   * Undoes the last commands chunk
   * @export
   */
  undo() {
    if (this.getUndoCount() == 0) return;
    this._position--;
    const commands = this._commandArrays[this._position];
    for (let i = commands.length - 1; i >= 0; i--) {
      commands[i].undo();
    }
    this.scheduleNotify(commands, IS.Commands.ExecutedEvent.ACTIONS.UNDO);
  }

  /**
   * Redones the last commands chunk to be redone
   * @export
   */
  redo() {
    if (this.getRedoCount() == 0) return;
    const commands = this._commandArrays[this._position];
    commands.forEach(x => x.redo());
    this._position++;
    this.scheduleNotify(commands, IS.Commands.ExecutedEvent.ACTIONS.REDO);
  }

  /**
   * @export
   * @return {number} the number of commands chunks that could be undone. 0 if non could be undone
   */
  getUndoCount() {
    return this._position;
  }

  /**
   * @export
   * @return {number} the number of commands chunks that could be redone. 0 if non could be redone
   */
  getRedoCount() {
    return this._commandArrays.length - this._position;
  }

  /**
   * @export
   * @return {number} the position at which the next command will be put when executed.
   */
  getPosition() {
    return this._position;
  }

  /**
   * @export
   * @return {Array<Array<IS.Commands.ICommand>>} the command arrays in the history in the ordered in which they were executed or empty array if there
   * are no commands executed
   * @see {IS.Commands.History#getPosition}
   */
  getCommandArrays() {
    return this._commandArrays.slice(0, this._commandArrays.length);
  }

  /**
   * @private
   */
  scheduleNotify(commands, action) {
    const event = new IS.Commands.ExecutedEvent(commands, action);
    this.getCore().scheduleNotify({
      "commandsExecuted": event
    });
  }
};

IS.Commands.History.SERVICE_TYPE = "com.axlessoft.ai3d.is.commands.history";
