class Article < ApplicationRecord
  validates :title, presence: true, length: { minimum: 20, minimum: 1 }
  validates :body, presence: true
end
