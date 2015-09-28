class TestService

	attr_accessor :name

	def initialize(name)
		@name = name
	end

	def say_hello
		"Hello, #{@name}"
	end

end