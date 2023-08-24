class TeamStatValidator < ActiveModel::Validator
  def validate(record)
    return if record.model_type == 'Team'

    record.errors[:model] << 'must be a Team'
  end
end