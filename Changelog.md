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

## [1.0.5] - 2020-01-12

### Changed
- [core] Migrating to is-core-6.0.0.pre.84 that provides {@link IS.AxlesIS#addExtensionDefs}

## [1.0.4] - 2020-01-12

### Changed
- [core] Migrating to is-core-6.0.0.pre.83 that provides {@link IS.AxlesIS#addExtensionDef}

## [1.0.3] - 2019-12-31

### Fixed
- [steps-tree]  Depending on is-core 6.0.0.pre.77 that has no steps-tree extension in it and using the steps-tree extension from is-steps_tree 1.0.2

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