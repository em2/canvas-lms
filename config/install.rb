# Sprinkle Opentapestry provisioning script
#
# Run using:
#     cd config
#     sprinkle -s install.rb
#     STAGE=vagrant sprinkle -c -s install.rb

$:<< File.join(File.dirname(__FILE__), 'sprinkle-packages')

%w( update base git ruby nginx unicorn app newrelic cleanup).each do |lib|
  require lib
end

policy :opentapestry, :roles => :app do
  requires :system_update
  requires :base
  requires :database_client
  requires :git
  requires :ruby
  requires :webserver
  requires :appserver
  requires :app
  requires :newrelic
  requires :cleanup
end

deployment do

  # mechanism for deployment
  delivery :capistrano do

    if ENV['STAGE'].nil?
      set :stage, 'production'
    else
      set :stage, ENV['STAGE']
    end

    recipes 'deploy'
    recipes "deploy/#{ENV['STAGE']}"
  end
end
