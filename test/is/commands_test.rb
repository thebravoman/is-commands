require 'test_helper'

class Is::Commands::Test < ActiveSupport::TestCase
  test "truth" do
    assert_kind_of Module, Is::Commands
  end
end
