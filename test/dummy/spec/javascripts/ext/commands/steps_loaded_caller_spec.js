//= require ext/commands/step_command
//= require ext/commands/steps_loaded_caller
//= require ext/commands/executed_event
describe("IS.Commands.StepsLoadedCaller", function() {
  class DummyStepsLoadedCallerExtension extends IS.Extension {
    constructor() {
      super();
    }

    onStepsTreeLoaded() {
      this.stepsTreeLoaded = DummyStepsLoadedCallerExtension.ORDER++;
      this.getCore().scheduleNotify({ "event2": new Object() });
    }

    onEvent2() {
      this.event2 = DummyStepsLoadedCallerExtension.ORDER++;
    }

    onCommandsExecuted() {}
  }
  DummyStepsLoadedCallerExtension.ORDER = 0;

  it("calls stepsTreeLoaded for all extensions that listen to stepsTreeLoaded but not to commandsExecuted. In this way extensions could reload their view if they can not handle delta change of the view.", function() {
    this.extension1 = new DummyStepsLoadedCallerExtension();
    this.extension2 = new DummyStepsLoadedCallerExtension();
    DummyStepsLoadedCallerExtension.ORDER = 0;
    this.extConf1 = IS.ExtensionDef.CreateByExtensionConf(
      {
        "extension": this.extension1,
        "events": {
          "stepsTreeLoaded": {
            "receivesWith": this.extension1.onStepsTreeLoaded,
            "class": Object
          },
          "commandsExecuted": {
            "receivesWith": this.extension1.onCommandsExecuted,
            "class": Object
          },
          "event2": {
            "class": Object
          }
        }
      },
      "dev"
    );
    this.extConf2 = IS.ExtensionDef.CreateByExtensionConf(
      {
        "extension": this.extension2,
        "events": {
          "stepsTreeLoaded": {
            "receivesWith": this.extension2.onStepsTreeLoaded
          },
          "event2": {
            "receivesWith": this.extension2.onEvent2
          }
        }
      },
      "dev"
    );

    this.callerExtension = new IS.Commands.StepsLoadedCaller();
    this.extConf3 = IS.ExtensionDef.CreateByExtensionConf(
      {
        "extension": this.callerExtension,
        "events": {
          "commandsExecuted": {
            "receivesWith": this.callerExtension.onCommandsExecuted
          }
        }
      },
      "dev"
    );

    this.isCore = new IS.Core([this.extConf1, this.extConf2, this.extConf3]);
    this.isCore.init();
    const command = new IS.Commands.StepCommand(new IS.StepsTree.StepData("1"));
    const extDefs = this.isCore.getExtensionDefsListeningFor({ commandsExecuted: true });
    this.isCore.scheduleNotify({ "commandsExecuted": new IS.Commands.ExecutedEvent([command]) }, extDefs);

    expect(this.extension2.stepsTreeLoaded).toEqual(0);
  });
});
