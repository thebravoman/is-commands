//= require ext/commands/step_command
//= require ext/commands/step_reorder_command
//= require ext/commands/history
//= require ext/commands/executed_event
//= require ext/commands/steps_loaded_caller
IS.AxlesIS.GetInstance().addExtension(() => {
	const extension = new IS.Commands.History();
	const extensionDef = IS.ExtensionDef.CreateByExtensionConf({
	    "extension": extension,
	    "events": {
	    	"commandsExecuted": {
	    		"class": IS.Commands.ExecutedEvent,
	    		"broadcasts": true,
	    		"apiName": 'commandsExecuted'
	    	}
	    },
	    "services": [{
	    	"type": "com.axlessoft.ai3d.is.commands.history"
	    }]
	}, "dev");
	return extensionDef;
})

IS.AxlesIS.GetInstance().addExtension(() => {
	const extension = new IS.Commands.StepsLoadedCaller();
	const extensionDef = IS.ExtensionDef.CreateByExtensionConf({
	    "extension": extension,
	    "events": {
	    	"commandsExecuted": {
	    		"receivesWith": extension.onCommandsExecuted
	    	} 
	    }
	}, "dev");
	return extensionDef;
})
