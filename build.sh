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

bundle exec rake is:gcc:sdk_compile[ext/commands/register_commands,is-core]

bundle exec rake is:gcc:production_compile[ext/commands/register_commands,is-core]
bundle exec rake is:gcc:production_compile[ext/commands/step_create_command,is-core]
bundle exec rake is:gcc:production_compile[ext/commands/step_delete_command,is-core]
bundle exec rake is:gcc:production_compile[ext/commands/step_reorder_command,is-core]
bundle exec rake is:gcc:production_compile[ext/commands/deltas/step_create_delta,is-core]
bundle exec rake is:gcc:production_compile[ext/commands/deltas/step_delete_delta,is-core]
bundle exec rake is:gcc:production_compile[ext/commands/deltas/step_reorder_delta,is-core]

cd ../../
bundle exec rake app:is:jsdoc