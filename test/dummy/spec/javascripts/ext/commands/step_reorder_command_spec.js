//= require ext/commands/step_command
//= require ext/commands/step_reorder_command
describe("ChangeParentCommand", function() {
  beforeEach(function() {
    const tree = {
      name: "root",
      children: [
        {
          name: "parent1",
          children: [
            {
              name: "parent1.child1"
            },
            {
              name: "parent1.child2"
            }
          ]
        },
        {
          name: "parent2",
          children: [
            {
              name: "parent2.child2"
            }
          ]
        }
      ]
    };
    this.rootStep = IS.TreeUtil.CreateTreeFromParentWithChildren(tree, function(node) {
      let stepData = new IS.StepsTree.StepData(node.name);
      stepData.setData(node);
      stepData.children = node.children;
      return stepData;
    });
    this.step = this.rootStep.children[0].children[1];
    this.oldParent = this.step.parent;
    this.oldPosition = this.step.parent.children.indexOf(this.step);
    this.newParent = this.rootStep.children[1];
    this.newPosition = 0;
    this.command = new IS.Commands.StepReorderCommand(this.step, this.newParent, this.newPosition);
  });

  describe("throws error on construction", function() {
    it("for null step", function() {
      expect(function() {
        new IS.Commands.StepReorderCommand(null, {}, 1);
      }).toThrow(new Error("Null argument passed."));
    });

    it("for null new parent", function() {
      expect(function() {
        new IS.Commands.StepReorderCommand({}, null, 1);
      }).toThrow(new Error("Null argument passed."));
    });

    it("for when the step has no parent", function() {
      expect(function() {
        new IS.Commands.StepReorderCommand({}, {}, 1);
      }).toThrow(new Error("Null argument passed."));
    });
  });

  describe("execute", function() {
    it("changes the parent add at 0 position", function() {
      this.command.execute();
      expect(this.step.parent).toEqual(this.newParent);
      expect(this.newParent.children[0]).toEqual(this.step);
    });

    it("changes the order if the parent is the same", function() {
      this.command = new IS.Commands.StepReorderCommand(this.step, this.step.parent, 0);
      this.command.execute();
      expect(this.step.parent).toEqual(this.oldParent);
      expect(this.oldParent.children[0]).toEqual(this.step);
    });
  });

  describe("undo", function() {
    it("returns the step to the previous parent at the previous position", function() {
      this.command.execute();
      this.command.undo();
      expect(this.step.parent).toEqual(this.oldParent);
      expect(this.oldParent.children[this.oldPosition]).toEqual(this.step);
    });
  });

  describe("redo", function() {
    it("returns the step to the newParent and new position", function() {
      this.command.execute();
      this.command.undo();
      this.command.redo();
      expect(this.step.parent).toEqual(this.newParent);
      expect(this.newParent.children[0]).toEqual(this.step);
    });
  });
});
