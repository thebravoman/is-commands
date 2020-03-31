#!/bin/bash
set -e

# Prettier
bundle exec rake app:is:pretty

cd test/dummy
if [ -x "$(command -v xvfb-run)" ]; then
  xvfb-run -a bundle exec rake teaspoon
else
  bundle exec rake teaspoon
fi

bundle exec rake is:gcc:sdk_compile[ext/commands/register_history,is-core]
bundle exec rake is:gcc:sdk_compile[ext/commands/register_steps_loaded_caller,is-core]
bundle exec rake is:gcc:sdk_compile[ext/commands/deltas/i_delta,is-core]

bundle exec rake is:gcc:production_compile[ext/commands/register_history,is-core]
bundle exec rake is:gcc:production_compile[ext/commands/register_steps_loaded_caller,is-core]
bundle exec rake is:gcc:production_compile[ext/commands/deltas/i_delta,is-core]

cd ../../
bundle exec rake app:is:jsdoc