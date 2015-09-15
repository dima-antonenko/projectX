# config valid only for current version of Capistrano
lock '3.4.0'
 
set :application,  'projectx'
set :repo_url,     'https://github.com/dima-antonenko/projectX.git'
 
set :shared_path,  "/home/#{fetch(:user)}/projects/#{fetch(:application)}/shared"
set :bundle_dir,   File.join(fetch(:shared_path), 'gems')
set :user,         'hosting_dima-antonenko'
set :login,        'hosting_dima-antonenko'
set :unicorn_conf, "/etc/unicorn/#{fetch(:application)}.#{fetch(:login)}.rb"
set :unicorn_pid,  "/var/run/unicorn/#{fetch(:user)}/#{fetch(:application)}.#{fetch(:login)}.pid"
 
set :rvm_ruby_version, "2.2.2"
set :bundle_cmd,       -> {"rvm use #{fetch(:rvm_ruby_version)} do bundle"}
set :rake,             -> { "#{fetch(:bundle_cmd)} exec rake" }
 
# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call
 
# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/#{fetch(:user)}/projects/#{fetch(:application)}" 

set :linked_dirs, %w{app/views/instances/custom public/assets/ckeditor}
 
# Default value for :scm is :git
# set :scm, :git
 
# Default value for :format is :pretty
# set :format, :pretty
 
# Default value for :log_level is :debug
# set :log_level, :debug
 
# Default value for :pty is false
# set :pty, true
 
# Default value for :linked_files is []
set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')
 
# Default value for linked_dirs is []
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads')
 
# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }
 
# Default value for keep_releases is 5
 set :keep_releases, 1
 
set :unicorn_start_cmd, "(cd #{fetch(:deploy_to)}/current; rvm use #{fetch(:rvm_ruby_version)} do bundle exec unicorn_rails -Dc #{fetch(:unicorn_conf)})"
 
namespace :deploy do
 
  desc 'Restart application, zero-downtime restart of Unicorn'
  task :restart do
    on roles(:app) do
      # Your restart mechanism here, for example:
      # execute :touch, release_path.join('tmp/restart.txt')
      execute "[ -f #{fetch(:unicorn_pid)} ] && kill -USR2 `cat #{fetch(:unicorn_pid)}` || #{fetch(:unicorn_start_cmd)}"
    end
  end
 
  desc "Start unicorn"
  task :start do
    on roles(:app) do
      execute fetch(:unicorn_start_cmd)
    end
  end
 
  desc "Stop unicorn"
  task :stop do
    on roles(:app) do
      execute "[ -f #{fetch(:unicorn_pid)} ] && kill -QUIT `cat #{fetch(:unicorn_pid)}`"
    end
  end
 
  desc "Seed database"
  task :seed do
    on roles(:db) do
      execute "cd #{fetch(:deploy_to)}/current; #{fetch(:rake)} db:seed RAILS_ENV=#{fetch(:rails_env)}"
    end
  end

  require 'fileutils'

  desc "Create nondigest versions of all ckeditor digest assets"
  task "assets:precompile" do
    fingerprint = /\-[0-9a-f]{32}\./
    for file in Dir["public/assets/ckeditor/**/*"]
      next unless file =~ fingerprint
      nondigest = file.sub fingerprint, '.'
      FileUtils.cp file, nondigest, verbose: true
    end
  end
 
  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end



  after :finishing, 'deploy:cleanup'



end
