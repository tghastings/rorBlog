class Post < ApplicationRecord
  validates :title, presence: true, uniqueness: true
  validates :author, presence: true
  validates :content, presence: true

  after_validation :set_slug, only: [:create, :update]

  def to_param
    "#{id}-#{slug}"
  end
end

private
  def set_slug
    self.slug = title.to_s.parameterize
  end 