class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  has_secure_password
  def self.authenticate(username, password)
    user = User.find_by(username: username)
    user&.authenticate(password)
  end
end
