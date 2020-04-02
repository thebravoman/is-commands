# Overview
Axles IS Commands framework is an extension of Axles IS. The goal of the Commands Framework is to provide a service for extensions to execute, redo or undo commands or arrays of commands easily and provide a blueprint for those commands.

When the Commands Framework extension is available, it provides extensions with the ability to execute commands and record the order of their execution. This allows for a undo/redo functionallity, but more importantly it makes change logic decoupled and contained in small simple classes.

# Define a command
All commands must implement the {@link IS.Commands.ICommand} interface.

IMPORTANT NOTE: The rows which start with ? are optional. You would have to add them only if you're using google closure compiler.

````
//= require gcc/tools
//= require ext/commands/i_command

?/**
? * @implements {IS.Commands.ICommand}
? */
class MyChangeCommand {

  constructor() {
    super();
    ?IS.GCC.Tools.OverrideMethod(IS.Commands.ICommand.prototype, "execute", MyChangeCommand.prototype);
    ?IS.GCC.Tools.OverrideMethod(IS.Commands.ICommand.prototype, "undo",  MyChangeCommand.prototype);
    ?IS.GCC.Tools.OverrideMethod(IS.Commands.ICommand.prototype, "redo",  MyChangeCommand.prototype);
  }
  ...
  ?/**
  ? * @override
  ? */
  execute() {
    ... execute the command
  }

  ?/**
  ? * @override
  ? */
  undo() {
    ... undo the command
  }

  ?/**
  ? * @override
  ? */
  redo() {
    ... redo the command
  }
}
````

If you need to save some internal state to be ready for the undo you should do this in 'execute'. {@link IS.Commands.ICommand#execute} is called only once, the first time a command is executed. From then on it is only {@link IS.Commands.ICommand#undo} and {@link IS.Commands.ICommand#redo}

# Create an instance of the command and execute it
Consider you are listening inside of an {@link Extension} for an event from the user as in the example below where we are listening for a click event.

````
class MyExtension extends Extension {
    ....
    onIteratorReady(iteratorReadyEvent) {
        ...
        const scope = this;
        domElement.addEventListener('click', event=>{
            const step = ...get current step based on the event
            const command = new MyChangeCommand(step,param1,param2);
            const commandHistoryConf = scope.getCore().getExtensionDefsForService("com.axlessoft.ai3d.is.commands.history")[0]
            if(commandHistoryConf) {
                const commandHistory= /** @type {IS.Commands.History} */ (commandHistoryConf.extension);
                commandHistory.execute([command]);
            }
        })
        ...
    }
}
````

To execute a command we: 
1. Create the instance of the command
2. Get the {@link IS.Commands.History} service from {@link IS.Core}
3. If there is a IS.Commands.History service the command is executed.

It is possible for the {@link IS.Commands.History} extension to be missing from the core and not to be registered. For example if only an IS viewer without editing capabilities is delivered to the clients browser. If your extension can provide survice for both when there is and there is no editing you should check if there is an extension providing the {@link IS.Commands.History} service. 

# Executing with IS.Commands.History
When executing with {@link IS.Commands.History} you execute an array of commands that are all considered as a single command. Than when you undo all the commands from the array will be undone. More about the reasoning for this is available at {@link IS.Commands.History}

When commands are executed a {@link IS.Commands.ExecutedEvent} is created and listeners for 'commandsExecuted' are notified.

# Listening for IS.Commands.ExecutedEvent
You can register your extension to listen for 'commandsExecuted' and it will receive {@link IS.Commands.ExecutedEvent} when commands are executed/undone/redone

## Define extension
````
class MyExtension extends Extension {
    onCommandsExecuted(event) {
        const commands = event.getCommands();
        const action = event.getAction();
        ...
    }
}
````

## Register extension
Register as describe at {@link IS.AxlesIS} and {@tutorial GettingStarted}
