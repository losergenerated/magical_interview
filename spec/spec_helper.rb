# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'rspec/autorun'


# Requires supporting ruby files with custom matchers and macros, etc,
# in spec/support/ and its subdirectories.
Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

RSpec.configure do |config|
  # ## Mock Framework
  #
  # If you prefer to use mocha, flexmock or RR, uncomment the appropriate line:
  #
  # config.mock_with :mocha
  # config.mock_with :flexmock
  # config.mock_with :rr

  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = true

  # If true, the base class of anonymous controllers will be inferred
  # automatically. This will be the default behavior in future versions of
  # rspec-rails.
  config.infer_base_class_for_anonymous_controllers = false

  # Run specs in random order to surface order dependencies. If you find an
  # order dependency and want to debug it, you can fix the order by providing
  # the seed, which is printed after each run.
  #     --seed 1234
  config.order = "random"
end

def fixture_file_path(*suffix)
  found_spec_helper = false
  path_string = caller(0).detect do |path|
    found_spec_helper_this_iteration = path =~ /spec_helper\.rb/
    found_spec_helper ||= found_spec_helper_this_iteration
    found_spec_helper && !found_spec_helper_this_iteration
  end
  path_string.gsub! /\A#{Regexp.escape(Rails.root.to_s)}#{Regexp.escape(File::SEPARATOR)}/, ''
  path = path_string.split(File::SEPARATOR)
  while(path.shift != 'spec'); end
  path.last.gsub!(/_spec\.rb.*/, '') #get rid of _spec.rb...
  path.concat suffix
  File.join(Rails.root.to_s, 'spec', 'fixtures', 'files', *path)
end

def load_fixture_file(*suffix)
  open( fixture_file_path(*suffix) )
end
