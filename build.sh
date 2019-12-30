#!/bin/bash
set -e
cd test/dummy
xvfb-run -a bundle exec rake teaspoon
bundle exec rake is:gcc:sdk_compile[ext/commands/register_commands,is-core]
bundle exec rake is:gcc:production_compile[ext/commands/register_commands,is-core]

cd ../../
bundle exec rake app:is:jsdoc