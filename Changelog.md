All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
.pre versions show that the version is still not released. API could be broken. Features could be added and remove.

Added for new features.
Changed for changes in existing functionality.
Deprecated for once-stable features removed in upcoming releases.
Removed for deprecated features removed in this release.
Fixed for any bug fixes.
Security to invite users to upgrade in case of vulnerabilities.

## [Unreleased]
## [2.0.2] - 2020-04-21

## [2.0.1] - 2020-04-21

### Removed

- deps - remove upper limits

## [2.0.0] - 2020-04-08

### Removed
 - All Commands and deltas relating to StepData have been removed from this repository and were moved to the is-steps_tree repository.

### Changed
- The Command class has been reworked into an interface instead, called ICommand. Check the documentation of the interface to learn more.

## [1.0.11] - 2020-02-28

### Fixed
- [Step Create Command] fixing gcc errors
- [Step Delete Command] Fixing gcc errors and a bug where undoing the command would add an aditional child to the parent node
- [Build] Adding js files which are not required by the register_commands file, so they also get compiled and we can catch warnings and errors earlier

## [1.0.10] - 2020-02-24

### Fixed
- [iom] dependent on iom

## [1.0.9] - 2020-02-06

### Fixed

- [StepCreateCommand] Fixed a bug where it wouldn't set the parent of the newly created step to the specified parent

## [1.0.8] - 2020-02-05

### Changed

- Now supports the true root node introduced by the is-steps_tree extension version 2.0.0

## [1.0.7] - 2020-01-31

### Added

- Added the StepCreateCommand and StepDeleteCommand commands
- Added a new namespace IS.Commands.Deltas
- Added the StepCreateDelta, StepDeleteDelta and StepReorderDelta deltas
- [Step Command] The step command now has a delta property, which can be read via the getDelta() method. Each child class of the StepCommand class generates a delta when it gets executed. The type of the delta depends on the command we're executing and what it does exactly. For example if we execute a StepDeleteCommand, that will generate a StepDeleteDelta, but if we undo a StepDeleteCommand that will generate a StepCreateDelta.

## [1.0.6] - 2020-01-31

### Added

- [prettier] auto prettifying on build

## [1.0.5] - 2020-01-12

### Changed

- [core] Migrating to is-core-6.0.0.pre.84 that provides {@link IS.AxlesIS#addExtensionDefs}

## [1.0.4] - 2020-01-12

### Changed

- [core] Migrating to is-core-6.0.0.pre.83 that provides {@link IS.AxlesIS#addExtensionDef}

## [1.0.3] - 2019-12-31

### Fixed

- [steps-tree] Depending on is-core 6.0.0.pre.77 that has no steps-tree extension in it and using the steps-tree extension from is-steps_tree 1.0.2

## [1.0.2] - 2019-12-31

### Fixed

- when registering events they should not be quoted.

Should be this:

```
            triedMoveIterator: {
                "class": IS.GlobalIterator.TriedMoveEvent,
                "receivesWith": extensionInstance.onTriedMoveIterator,
                "apiName": 'triedMoveIterator'
            }
```

Instead of this:

```
            "triedMoveIterator": {
                "class": IS.GlobalIterator.TriedMoveEvent,
                "receivesWith": extensionInstance.onTriedMoveIterator,
                "apiName": 'triedMoveIterator'
            }
```

## [1.0.1] - 2019-12-31

### Fixed

- removing dependency in IS.GlobalIterator in the specs

## [1.0.0] - 2019-12-30

### Added

- initially moving from is-core to is-commands repo
