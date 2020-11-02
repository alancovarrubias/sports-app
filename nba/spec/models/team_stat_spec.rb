RSpec.describe TeamStat, type: :model do
  it 'FactoryBot is valid' do
    expect(FactoryBot.build(:team_stat)).to be_valid
  end

  it 'should succeed with a team model' do
    team = FactoryBot.build(:team)
    stat = TeamStat.create(model: team)
    expect(stat.errors.messages[:model]).to be_empty
  end

  it 'should fail with a player model' do
    player = FactoryBot.build(:player)
    stat = TeamStat.create(model: player)
    expect(stat.errors.messages[:model]).to include('must be a Team')
  end
end
