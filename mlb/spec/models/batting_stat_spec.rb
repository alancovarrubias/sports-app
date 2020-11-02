require 'rails_helper'

RSpec.describe BattingStat, type: :model do
  describe 'associations' do
    it { should belong_to(:season) }
    it { should belong_to(:game) }
    it { should belong_to(:model) }
  end
end
