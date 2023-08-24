require 'rails_helper'

RSpec.describe Stat, type: :model do
  describe 'associations' do
    it { should belong_to(:model) }
    it { should belong_to(:interval) }
  end
end
