role :app, %w{sulfur.locum.ru}
role :web, %w{sulfur.locum.ru}
role :db,  %w{sulfur.locum.ru}
 
set :ssh_options, {
  user: fetch(:user),
  forward_agent: true,
  auth_methods: %w(password),
  password: 'xaPFjibKdW'
}