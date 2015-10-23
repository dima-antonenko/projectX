class Advert < ActiveRecord::Base

  belongs_to :seller
  belongs_to :product
  
  has_many :advert_categories
  has_many :advert_positions
 
end