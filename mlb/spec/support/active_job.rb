RSpec.configure do |config|
  config.include ActiveJob::TestHelper, type: :job
  config.after(:each, type: :job) { clear_enqueued_jobs }
end
