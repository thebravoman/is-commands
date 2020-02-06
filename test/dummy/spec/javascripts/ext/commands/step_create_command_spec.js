//= require ext/commands/step_command
//= require ext/commands/step_create_command

describe("StepCreateCommand", function() {
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

    this.stepID = "newStep";
    this.parent = this.rootStep.children[0];
    this.position = 1;
    this.command = new IS.Commands.StepCreateCommand(this.stepID, this.parent, this.position);
  });

  describe("throws error on construction", function() {
    it("for null stepID", function() {
      expect(function() {
        new IS.Commands.StepCreateCommand(null);
      }).toThrow(new Error("Null argument passed."));
    });

    it("for null parent of the step", function() {
      expect(function() {
        new IS.Commands.StepCreateCommand(this.stepID);
      }).toThrow(new Error("Null argument passed."));
    });

    it("for null position of the step", function() {
      expect(function() {
        new IS.Commands.StepCreateCommand(this.stepID, this.parent);
      }).toThrow(new Error("Null argument passed."));
    });
  });

  describe("execute", function() {
    beforeEach(function() {
      this.command.execute();
    });

    createsStepAndGeneratesDelta();
  });

  describe("undo", function() {
    beforeEach(function() {
      this.command.execute();
      this.command.undo();
    });

    it("removes the created step from the parents' children array", function() {
      expect(findCreatedStep(this.parent, this.stepID)).toBeUndefined();
    });

    itGeneratesACorrectDelta(IS.Commands.Deltas.StepDeleteDelta);
  });

  describe("redo", function() {
    beforeEach(function() {
      this.command.execute();
      this.command.undo();
      this.command.redo();
    });

    createsStepAndGeneratesDelta();
  });
});

function itGeneratesACorrectDelta(expectedDeltaClass) {
  it("generates a correct delta", function() {
    expect(this.command.getDelta()).toEqual(jasmine.any(expectedDeltaClass));
    expect(this.command.getDelta().getParent()).toBe(this.parent);
    expect(this.command.getDelta().getPosition()).toEqual(this.position);
    expect(
      this.command
        .getDelta()
        .getStep()
        .getId()
    ).toBe(this.stepID);
  });
}

function createsStepAndGeneratesDelta() {
  it("creates the step with the given id in the specified parents' children array", function() {
    expect(findCreatedStep(this.parent, this.stepID)).not.toBeUndefined();
  });

  it("creates the step with the correct parent", function() {
    expect(this.command.getStep().parent).toBe(this.parent);
  });

  itGeneratesACorrectDelta(IS.Commands.Deltas.StepCreateDelta);
}

function findCreatedStep(parent, stepID) {
  return parent.children.find(step => step.getId() == stepID);
}
