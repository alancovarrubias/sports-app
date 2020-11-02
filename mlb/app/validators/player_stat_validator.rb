class PlayerStatValidator < ActiveModel::Validator
  def validate(record)
    unless record.model_type == "Player"
      record.errors[:model] << "must be a Player"
    end
  end
end