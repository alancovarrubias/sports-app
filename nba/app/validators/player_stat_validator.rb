class PlayerStatValidator < ActiveModel::Validator
  def validate(record)
    return if record.model_type == 'Player'

    record.errors[:model] << 'must be a Player'
  end
end
