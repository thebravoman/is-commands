$:.push File.expand_path("lib", __dir__)

# Maintain your gem's version:
require "is/commands/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |spec|
  spec.name        = "is-commands"
  spec.version     = Is::Commands::VERSION
  spec.authors     = ["Kiril Mitov"]
  spec.email       = ["kmitov@axlessoft.com"]
  spec.homepage    = "https://www.axlessoft.com"
  spec.summary     = "Commands framework of IS"
  spec.description = "Commands framework of IS"
  spec.license     = "All rights reserved"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata["allowed_push_host"] = "TODO: Set to 'http://mygemserver.com'"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
      "public gem pushes."
  end

  spec.files = Dir["{app,config,db,lib}/**/*","{tutorials}/**/*", "Changelog.md","jsdoc.conf", "Rakefile", "README.md"]

  spec.add_dependency "rails", "~> 5.2.4", ">= 5.2.4.1"

  spec.add_development_dependency "sqlite3"

  spec.add_dependency "is-core", "~> 6.0.0.pre.84"
  spec.add_development_dependency "is-core", "~> 6.0.0.pre.84"

  spec.add_dependency "is-gcc_tools", ">= 1.2.7", "< 2.0"
  spec.add_development_dependency "is-gcc_tools", ">= 1.2.7", "< 2.0"

  spec.add_development_dependency "teaspoon-jasmine"
  spec.add_development_dependency "selenium-webdriver"
  spec.add_development_dependency 'spring-commands-teaspoon'
  spec.add_development_dependency 'coffee-script'
end
