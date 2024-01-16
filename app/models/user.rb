class User < ApplicationRecord
  before_save { email.downcase! }

  validates :name, presence: true, length: { minimum: 4, maximum: 50 }
  validates :email, presence: true, length: { minimum: 6, maximum: 255 },
                    format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i },
                    uniqueness: true
end
