json.array!(@site_variables) do |site_variable|
  json.extract! site_variable, :id
  json.url site_variable_url(site_variable, format: :json)
end
