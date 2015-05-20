load 'deploy' if respond_to?(:namespace) # cap2 differentiator

# Uncomment if you are using Rails' asset pipeline
load 'deploy/assets'

Dir['vendor/gems/*/recipes/*.rb','vendor/plugins/*/recipes/*.rb'].each { |plugin| load(plugin) }

require 'bundler/capistrano'

load 'config/deploy'

namespace :redis do

    desc "Flushes all Redis data"
    task :flushall, :roles => [:app] do
      run "redis-cli flushall"
    end

    desc "Restart Redis"
    task :restart, :roles => [:app], :max_hosts => 1 do
      sudo "/etc/init.d/redis-server stop; sudo /etc/init.d/redis-server start"
    end

end
