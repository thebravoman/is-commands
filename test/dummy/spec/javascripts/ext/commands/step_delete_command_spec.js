//= require ext/commands/step_command
//= require ext/commands/step_delete_command
describe("StepDeleteCommand", function() {
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
    this.parent = this.step.parent;
    this.position = this.step.parent.children.indexOf(this.step);
    this.command = new IS.Commands.StepDeleteCommand(this.step);
  });

  describe("throws error on construction", function() {
    it("for null step", function() {
      expect(function() {
        new IS.Commands.StepDeleteCommand(null);
      }).toThrow(new Error("Null argument passed."));
    });

    it("for null parent of the step", function() {
      expect(function() {
        new IS.Commands.StepDeleteCommand(this.rootStep);
      }).toThrow(new Error("Null argument passed."));
    });
  });

  describe("execute", function() {
    beforeEach(function() {
      this.command.execute();
    });

    removesStepAndGeneratesDelta();
  });

  describe("undo", function() {
    beforeEach(function() {
      this.command.execute();
      this.command.undo();
    });

    it("returns the step to the parents children array", function() {
      expect(this.step.parent.children).toContain(this.step);
    });

    itGeneratesACorrectDelta(IS.Commands.Deltas.StepCreateDelta);
  });

  describe("redo", function() {
    beforeEach(function() {
      this.command.execute();
      this.command.undo();
      this.command.redo();
    });

    removesStepAndGeneratesDelta();
  });
});

function itGeneratesACorrectDelta(expectedDeltaClass) {
  it("generates a correct delta", function() {
    expect(this.command.getDelta()).toEqual(jasmine.any(expectedDeltaClass));
    expect(this.command.getDelta().getStep()).toBe(this.step);
    expect(this.command.getDelta().getParent()).toBe(this.parent);
    expect(this.command.getDelta().getPosition()).toEqual(this.position);
  });
}

function removesStepAndGeneratesDelta() {
  it("removes the step from the parents children array", function() {
    expect(this.parent.children).not.toContain(this.step);
  });

  itGeneratesACorrectDelta(IS.Commands.Deltas.StepDeleteDelta);
}
