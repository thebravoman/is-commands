//= require ext/commands/executed_event
describe("IS.Commands.ExecutedEvent", function() {
  describe("constructor throws an error", function() {
    it("for null commands list", function() {
      expect(function() {
        new IS.Commands.ExecutedEvent(null, "undo");
      }).toThrow(new Error("Null argument passed."));
    });

    it("for command list that is not an array", function() {
      expect(function() {
        new IS.Commands.ExecutedEvent("not an array", "undo");
      }).toThrow("argument is not an array");
    });
    it("for command list that is an array of other objects", function() {
      expect(function() {
        new IS.Commands.ExecutedEvent([1, 2], "undo");
      }).toThrow("array objects are not instances of correct type");
    });
  });
});
