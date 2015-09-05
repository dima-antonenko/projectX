class MenuItem < ActiveRecord::Base
	belongs_to :menu
	belongs_to :menu_item
	has_many :menu_items
end
