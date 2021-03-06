//= require ext/commands/commands
//= require ext/commands/i_command
//= require ext/commands/history
//= require ext/commands/executed_event
describe("IS.Commands.History", function() {
  class DummyCommand {
    constructor(step) {
      this.step = step;
    }

    execute() {
      this.executed = DummyCommand.ORDER++;
    }
    undo() {
      this.undone = DummyCommand.ORDER++;
    }
    redo() {
      this.redone = DummyCommand.ORDER++;
    }
  }
  DummyCommand.ORDER = 0;

  class DummyListener extends IS.Extension {
    constructor() {
      super();
    }

    onCommandsExecuted(event) {
      this.commandsExecuted = event;
    }
  }

  beforeEach(function() {
    this.commandsHistory = new IS.Commands.History();
    this.dummyListener = new DummyListener();
    const ext = [
      IS.ExtensionDef.CreateByExtensionConf(
        {
          "extension": this.commandsHistory,
          "events": {
            "commandsExecuted": {
              "class": Object
            }
          }
        },
        "dev"
      ),
      IS.ExtensionDef.CreateByExtensionConf(
        {
          "extension": this.dummyListener,
          "events": {
            "commandsExecuted": {
              "receivesWith": this.dummyListener.onCommandsExecuted
            }
          }
        },
        "dev"
      )
    ];
    this.isCore = new IS.Core(ext);
    this.isCore.init();

    this.step = {
      "name": "root"
    };

    this.command1 = new DummyCommand(this.step);
    this.command2 = new DummyCommand(this.step);
    DummyCommand.ORDER = 0;
  });

  it("initializes position in the init method and not in the constructor because if in the constructor an error occurs that position is NAN. Don't know why yet", function() {
    const ch = new IS.Commands.History();
    expect(ch._position).toEqual(0);
  });

  describe("execute", function() {
    beforeEach(function() {
      this.commandsHistory.execute([this.command1, this.command2]);
    });

    it("executed two commands on execute", function() {
      expect(this.command1.executed).toEqual(0);
      expect(this.command2.executed).toEqual(1);
    });

    it("schedules a notification with executed to listeners", function() {
      expect(this.dummyListener.commandsExecuted.getAction()).toEqual(IS.Commands.ExecutedEvent.ACTIONS.EXECUTE);
    });

    it("increases undo count", function() {
      expect(this.commandsHistory.getUndoCount()).toEqual(1);
    });

    it("replaces the undone commands with the second commands and the undone can no longer be redone", function() {
      const command3 = new DummyCommand(this.step);
      this.commandsHistory.undo();
      this.commandsHistory.execute([command3]);

      expect(this.commandsHistory.getUndoCount()).toEqual(1);
      expect(this.commandsHistory.getRedoCount()).toEqual(0);
      expect(command3.executed).toEqual(4);
      this.commandsHistory.undo();
      expect(command3.undone).toEqual(5);
    });
  });

  describe("undo", function() {
    beforeEach(function() {
      this.commandsHistory.execute([this.command1, this.command2]);
      this.commandsHistory.undo();
    });

    it("undones all executed commands on previous steps", function() {
      expect(this.command1.undone).toEqual(3);
      expect(this.command2.undone).toEqual(2);
    });

    it("schedules a notification with undo to listeners", function() {
      expect(this.dummyListener.commandsExecuted.getAction()).toEqual(IS.Commands.ExecutedEvent.ACTIONS.UNDO);
    });

    it("descrease undo count", function() {
      expect(this.commandsHistory.getUndoCount()).toEqual(0);
    });

    it("increases redo count", function() {
      expect(this.commandsHistory.getRedoCount()).toEqual(1);
    });

    it("does nothing if there is nothing to undo", function() {
      this.commandsHistory.undo();
    });
  });

  describe("redo", function() {
    beforeEach(function() {
      this.commandsHistory.execute([this.command1, this.command2]);
      this.commandsHistory.undo();
      this.commandsHistory.redo();
    });

    it("redones all undone commands on previous steps", function() {
      expect(this.command1.redone).toEqual(4);
      expect(this.command2.redone).toEqual(5);
    });

    it("schedules a notification with undo to listeners", function() {
      expect(this.dummyListener.commandsExecuted.getAction()).toEqual(IS.Commands.ExecutedEvent.ACTIONS.REDO);
    });

    it("increases undo count", function() {
      expect(this.commandsHistory.getUndoCount()).toEqual(1);
    });

    it("descreases redo count", function() {
      expect(this.commandsHistory.getRedoCount()).toEqual(0);
    });

    it("does nothing if there is nothing to redo", function() {
      expect(this.commandsHistory.getRedoCount()).toEqual(0);
      this.commandsHistory.redo();
    });
  });

  it("getPosition return the current position ", function() {
    expect(this.commandsHistory.getPosition()).toEqual(0);
    this.commandsHistory.execute([this.command1]);
    expect(this.commandsHistory.getPosition()).toEqual(1);
    this.commandsHistory.undo();
    expect(this.commandsHistory.getPosition()).toEqual(0);
  });

  it("getCommandArrays returns a shallow copy of the commands", function() {
    expect(this.commandsHistory.getCommandArrays()).toEqual([]);
    this.commandsHistory.execute([this.command1]);
    expect(this.commandsHistory.getCommandArrays()).toEqual([[this.command1]]);
    const copy = this.commandsHistory.getCommandArrays();
    copy[0] = null; //this should not change the array
    expect(this.commandsHistory.getCommandArrays()).toEqual([[this.command1]]);
  });
});
