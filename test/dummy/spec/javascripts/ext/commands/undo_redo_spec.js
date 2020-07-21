//= require ext/commands/commands
//= require ext/commands/i_command
//= require ext/commands/history
//= require ext/commands/executed_event
//= require ext/commands/undo_redo
describe("IS.Commands.UndoRedo", function() {
  class DummyCommand {
    constructor() {
      this.title = "The command title";
    }
    execute() {}
    undo() {}
    redo() {}
    toHumanized() {
      return {
        "title": this.title
      };
    }
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
            },
            "commandsExecuted": {
              "receivesWith": this.undoRedo.onCommandsExecuted
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
    expect(document.getElementById("is-undo").disabled).toEqual(true);
    expect(document.getElementById("is-redo").disabled).toEqual(false);

    document.getElementById("is-redo").click();
    expect(this.history.getUndoCount()).toEqual(1);
    expect(this.history.getRedoCount()).toEqual(0);
    expect(document.getElementById("is-undo").disabled).toEqual(false);
    expect(document.getElementById("is-redo").disabled).toEqual(true);
  });

  it("sets initial disabled styles", function() {
    expect(document.getElementById("is-undo").disabled).toEqual(true);
    expect(document.getElementById("is-redo").disabled).toEqual(true);
  });

  it("sets styles after executing an event is received for executed commands", function() {
    this.history.execute([this.command1]);
    expect(document.getElementById("is-undo").disabled).toEqual(false);
    expect(document.getElementById("is-redo").disabled).toEqual(true);

    this.history.undo();
    expect(document.getElementById("is-undo").disabled).toEqual(true);
    expect(document.getElementById("is-redo").disabled).toEqual(false);
  });

  describe("buttons title", function() {
    it("sets undo/redo button title form humanized commands", function() {
      expect(document.getElementById("is-undo").title).toEqual("");
      this.history.execute([this.command1]);
      expect(document.getElementById("is-undo").title).toEqual("The command title");
      const newCommand = new DummyCommand();
      newCommand.title = "new command title";
      const newCommand2 = new DummyCommand();
      newCommand2.title = "new command 2";
      this.history.execute([newCommand, newCommand2]);
      expect(document.getElementById("is-undo").title).toEqual("new command title; new command 2");

      this.history.undo();
      expect(document.getElementById("is-redo").title).toEqual("new command title; new command 2");
    });

    it("shows just 'command' for commands that are not humanized", function() {
      const unhumanized = new DummyCommand();
      unhumanized.toHumanized = undefined;
      const command = new DummyCommand();
      command.title = "humanized command";
      this.history.execute([unhumanized, command]);

      expect(document.getElementById("is-undo").title).toEqual("(unhumanized command); humanized command");
      this.history.undo();
      expect(document.getElementById("is-redo").title).toEqual("(unhumanized command); humanized command");
    });
  });
});
