# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
Rails.application.config.assets.precompile += %w(
ext/commands/register_commands
ext/commands/step_create_command
ext/commands/step_delete_command
ext/commands/step_reorder_command
ext/commands/deltas/step_create_delta
ext/commands/deltas/step_delete_delta
ext/commands/deltas/step_reorder_delta
)
