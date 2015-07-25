class AdministratorController < ApplicationController


	layout "administrator"

	def dashboard
		render "layouts/administrator/dashboard"
	end	
end