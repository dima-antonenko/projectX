class MiniCart < ActiveRecord::Base
	belongs_to :product
	belongs_to :seller	
end
