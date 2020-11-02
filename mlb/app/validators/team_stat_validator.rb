class TeamStatValidator < ActiveModel::Validator
  def validate(record)
    unless record.model_type == "Team"
      record.errors[:model] << "must be a Team"
    end
  end
end