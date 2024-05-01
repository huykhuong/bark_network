module TimeHelper
	def convert_to_graphql_time(time)
			Time.parse(time.to_s).strftime("%Y-%m-%d %H:%M:%S UTC")
	end    
end