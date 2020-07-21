//= require ext/commands/undo_redo
//= require ext/commands/executed_event
IS.AxlesIS.GetInstance().addExtensionDefs(() => {
  const extensionDefs = [];
  const undoRedo = new IS.Commands.UndoRedo();
  extensionDefs.push(
    IS.ExtensionDef.CreateByExtensionConf(
      {
        "extension": undoRedo,
        "events": {
          "coreInit": {
            "receivesWith": undoRedo.onCoreInit
          },
          "commandsExecuted": {
            "receivesWith": undoRedo.onCommandsExecuted
          }
        }
      },
      "dev"
    )
  );
  return extensionDefs;
});
