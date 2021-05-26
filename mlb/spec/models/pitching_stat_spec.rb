require 'rails_helper'

RSpec.describe PitchingStat, type: :model do
  describe 'associations' do
    it { should belong_to(:interval) }
    it { should belong_to(:model) }
  end
end
