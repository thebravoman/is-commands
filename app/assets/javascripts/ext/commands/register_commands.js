//= require ext/commands/step_command
//= require ext/commands/step_reorder_command
//= require ext/commands/history
//= require ext/commands/executed_event
//= require ext/commands/steps_loaded_caller
IS.AxlesIS.GetInstance().addExtensionDefs(() => {
	const extensionDefs = []
	const historyExtension = new IS.Commands.History();
	extensionDefs.push(IS.ExtensionDef.CreateByExtensionConf({
	    "extension": historyExtension,
	    "events": {
	    	commandsExecuted: {
	    		"class": IS.Commands.ExecutedEvent,
	    		"broadcasts": true,
	    		"apiName": 'commandsExecuted'
	    	}
	    },
	    "services": [{
	    	"type": "com.axlessoft.ai3d.is.commands.history"
	    }]
	}, "dev"));

	const reloadExtension = new IS.Commands.StepsLoadedCaller();
	extensionDefs.push(IS.ExtensionDef.CreateByExtensionConf({
	    "extension": reloadExtension,
	    "events": {
	    	"commandsExecuted": {
	    		"receivesWith": reloadExtension.onCommandsExecuted
	    	} 
	    }
	}, "dev"));
	return extensionDefs;
})
