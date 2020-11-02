RSpec.describe PlayerStat, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:player_stat)).to be_valid
  end

  it 'should succeed with a player model' do
    player = FactoryBot.build(:player)
    stat = PlayerStat.create(model: player)
    expect(stat.errors.messages[:model]).to be_empty
  end

  it 'should fail with a team model' do
    team = FactoryBot.build(:team)
    stat = PlayerStat.create(model: team)
    expect(stat.errors.messages[:model]).to include('must be a Player')
  end
end
