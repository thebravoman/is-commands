//= require ext/commands/history
//= require ext/commands/executed_event
IS.AxlesIS.GetInstance().addExtensionDefs(() => {
  const extensionDefs = [];
  const historyExtension = new IS.Commands.History();
  extensionDefs.push(
    IS.ExtensionDef.CreateByExtensionConf(
      {
        "extension": historyExtension,
        "events": {
          commandsExecuted: {
            "class": IS.Commands.ExecutedEvent,
            "broadcasts": true,
            "apiName": "commandsExecuted"
          }
        },
        "services": [
          {
            "type": IS.Commands.History.SERVICE_TYPE
          }
        ]
      },
      "dev"
    )
  );
  return extensionDefs;
});
