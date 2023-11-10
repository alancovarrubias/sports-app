require 'rails_helper'

RSpec.describe Line, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:line)).to be_valid
  end

  describe 'associations' do
    it { should belong_to(:game) }
  end

  describe 'enums' do
    it { should define_enum_for(:interval).with_values(%i[full_game first_half]) }
    it { should allow_values(:full_game, :first_half).for(:interval) }
    it { should define_enum_for(:book).with_values(%i[opener closer]) }
    it { should allow_values(:opener, :closer).for(:book) }
  end
end
