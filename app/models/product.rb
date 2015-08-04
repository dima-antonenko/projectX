class Product < ActiveRecord::Base
  belongs_to :seller
  belongs_to :product_category

  has_many :product_attachments, inverse_of: :product
  accepts_nested_attributes_for :product_attachments, allow_destroy: true

  mount_uploader :avatar, ProductAvatarUploader

  has_many :line_items
  before_destroy :ensure_not_referenced_by_any_line_item

  private

  def ensure_not_referenced_by_any_line_item
    if line_items.empty?
      return true
    else
      errors.add(:base, 'существуют товарные позиции')
      return false
    end
  end

end
