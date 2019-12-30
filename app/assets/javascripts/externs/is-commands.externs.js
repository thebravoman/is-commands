// ext/commands
// 
// 
IS.Commands = function() {}
/** 
 * @constructor
 * @param {Array<IS.Commands.StepCommand>} commands
 * @param {string} action
 */
IS.Commands.ExecutedEvent = function(commands,action) {}
/**
 * @return {Array<IS.Commands.StepCommand>}
 */
IS.Commands.ExecutedEvent.prototype.getCommands = function() {}
/**
 * @return {string}
 */
IS.Commands.ExecutedEvent.prototype.getAction = function(){}

/** 
 * @constructor
 * @param  {IS.StepsTree.StepData} step
 */
IS.Commands.StepCommand = function(step) {}
IS.Commands.StepCommand.prototype.execute = function() {}
IS.Commands.StepCommand.prototype.redo = function() {}
IS.Commands.StepCommand.prototype.undo = function() {}
/**
 * @return {IS.StepsTree.StepData} 
 */
IS.Commands.StepCommand.prototype.getStep = function() {}

/** 
 * @constructor
 * @param  {IS.StepsTree.StepData} step
 * @param  {IS.StepsTree.StepData} newParent
 * @param {number} position
 * @extends {IS.Commands.StepCommand}
 */
IS.Commands.StepReorderCommand = function(step, newParent, position) {}
