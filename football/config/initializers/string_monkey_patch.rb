class String
  def methodize
    downcase.gsub(' ', '_')
  end
end
