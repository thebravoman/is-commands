//= require ext/commands/steps_loaded_caller
IS.AxlesIS.GetInstance().addExtensionDefs(() => {
  const extensionDefs = [];
  const reloadExtension = new IS.Commands.StepsLoadedCaller();
  extensionDefs.push(
    IS.ExtensionDef.CreateByExtensionConf(
      {
        "extension": reloadExtension,
        "events": {
          "commandsExecuted": {
            "receivesWith": reloadExtension.onCommandsExecuted
          }
        }
      },
      "dev"
    )
  );
  return extensionDefs;
});
