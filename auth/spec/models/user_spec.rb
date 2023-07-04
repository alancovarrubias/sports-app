require 'rails_helper'

RSpec.describe User, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:user)).to be_valid
  end

  describe 'validations' do
    it  { should have_secure_password }
    it  { should validate_presence_of(:email) }
    it  { should validate_uniqueness_of(:email) }
    it  { should validate_presence_of(:password) }
  end
end
