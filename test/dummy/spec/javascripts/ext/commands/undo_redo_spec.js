//= require ext/commands/commands
//= require ext/commands/i_command
//= require ext/commands/history
//= require ext/commands/executed_event
//= require ext/commands/undo_redo
describe("IS.Commands.UndoRedo", function() {
  class DummyCommand {
    execute() {}
    undo() {}
    redo() {}
  }

  beforeEach(function() {
    fixture.set("<div id='is-undo'></div><div id='is-redo'></div>");
    this.history = new IS.Commands.History();
    this.undoRedo = new IS.Commands.UndoRedo();
    const ext = [
      IS.ExtensionDef.CreateByExtensionConf(
        {
          "extension": this.history,
          "events": {
            "commandsExecuted": {
              "class": Object
            }
          },
          "services": [
            {
              "type": IS.Commands.History.SERVICE_TYPE
            }
          ]
        },
        "dev"
      ),
      IS.ExtensionDef.CreateByExtensionConf(
        {
          "extension": this.undoRedo,
          "events": {
            "coreInit": {
              "receivesWith": this.undoRedo.onCoreInit
            }
          }
        },
        "dev"
      )
    ];
    this.isCore = new IS.Core(ext);
    this.isCore.init();

    this.command1 = new DummyCommand();
  });

  it("undo/redo", function() {
    this.history.execute([this.command1]);
    expect(this.history.getUndoCount()).toEqual(1);

    document.getElementById("is-undo").click();
    expect(this.history.getUndoCount()).toEqual(0);
    expect(this.history.getRedoCount()).toEqual(1);

    document.getElementById("is-redo").click();
    expect(this.history.getUndoCount()).toEqual(1);
    expect(this.history.getRedoCount()).toEqual(0);
  });
});
