set :stages, %w(production local)
set :default_stage, "production"
set :whenever_command, "bundle exec whenever"
require "whenever/capistrano"
require 'capistrano/ext/multistage'

set :application, "canvas-lms"
set :repository,  "git@github.com:em2/canvas-lms.git"

set :scm, :git
ssh_options[:forward_agent] = true

set :use_sudo, false

set :branch, "em2-stable"

namespace :deploy do
  namespace :assets do
    desc 'Run the precompile task locally and rsync with shared'
    task :precompile, :roles => :app, :except => { :no_release => true } do
      %x{bundle exec rake canvas:compile_assets RAILS_ENV=production }
      servers = find_servers :roles => :web, :except => { :no_release => true }
      servers.each { |server| %x{rsync --recursive --times --rsh=ssh --compress --human-readable --progress public/assets #{user}@#{server}:#{shared_path}} }
    end
  end

  desc "Zero-downtime restart of Unicorn"
  task :restart, :except => { :no_release => true } do
    run "kill -s USR2 `cat /tmp/unicorn.canvas-lms.pid`"
  end

  desc "Start unicorn"
  task :start, :except => { :no_release => true } do
    run "cd #{current_path} && RAILS_ENV=production bundle exec unicorn_rails -c config/unicorn.rb -D  "
  end

  desc "Stop unicorn"
  task :stop, :except => { :no_release => true } do
    run "kill -s QUIT `cat /tmp/unicorn.canvas-lms.pid`"
  end
end

after 'deploy:update_code', 'deploy:symlink_configs'
after 'deploy:create_symlink', 'deploy:start_delayed_jobs'

namespace :deploy do
  desc "Symlinks the config files"
  task :symlink_configs, :roles => :app do
    %w{security.yml delayed_jobs.yml domain.yml database.yml newrelic.yml outgoing_mail.yml amazon_s3.yml assets.yml cache_store.yml redis.yml}.each do |config|
      run "ln -fs #{shared_path}/config/#{config} #{release_path}/config/#{config}"
    end
  end
end

namespace :deploy do
  desc "Start delayed_jobs"
  task :start_delayed_jobs, :roles => :app do
    run "cd #{current_path} && RAILS_ENV=production bundle exec script/delayed_job start"
  end
end

namespace :deploy do
  desc "Migrate Database"
  task :migrate_db, :roles => :app do
    run "cd #{current_path} && RAILS_ENV=production rake db:migrate"
  end
end

namespace :deploy do
  desc "Enable newrelic Pinging"
  task :enable_pinging, :roles => :app do
    run "cd #{current_path} && curl https://rpm.newrelic.com/accounts/102708/applications/2098552/ping_targets/enable -X POST -H \"X-Api-Key: 9317770e9abe93b1a37514625fcaf91d50eeb879f54b3a5\""
  end
end

namespace :deploy do
  desc "Disable newrelic Pinging"
  task :disable_pinging, :roles => :app do
    run "cd #{current_path} && curl https://rpm.newrelic.com/accounts/102708/applications/2098552/ping_targets/disable -X POST -H \"X-Api-Key: 9317770e9abe93b1a37514625fcaf91d50eeb879f54b3a5\""
  end
end

namespace :log do
  desc "tail production log files"
  task :tail, :roles => :app do
    run "tail -n 1000 -f #{shared_path}/log/production.log" do |channel, stream, data|
      trap("INT") { puts 'Interupted'; exit 0; }
      puts  # for an extra line break before the host name
      puts "#{channel[:host]}: #{data}"
      break if stream == :err
    end
  end
end

after "deploy", "assets:precompile"
