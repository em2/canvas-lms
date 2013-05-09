# See http://unicorn.bogomips.org/Unicorn/Configurator.html for complete documentation.
env = ENV["RAILS_ENV"] || "development" # Set environment to development unless something else is specified

worker_processes 6

listen "/tmp/unicorn.canvas-lms.socket", :backlog => 64

preload_app true # Preload our app for more speed

# timeout 30 # nuke workers after 30 seconds instead of 60 seconds (the default)

pid "/tmp/unicorn.canvas-lms.pid"

if env == "production"
  working_directory "/u/apps/canvas-lms/current"

  user 'ubuntu', 'ubuntu'

  shared_path = "/u/apps/canvas-lms/shared"# feel free to point this anywhere accessible on the filesystem

  stderr_path "/u/apps/canvas-lms/shared/log/unicorn.stderr.log"
  stdout_path "/u/apps/canvas-lms/shared/log/unicorn.stdout.log"

  before_exec do |server|
    ENV["BUNDLE_GEMFILE"] = "/u/apps/canvas-lms/current/Gemfile"
  end
end

before_fork do |server, worker|
  # The following is highly recomended for Rails + "preload_app true".
  # There's no need for the master process to hold a connection.
  if defined?(ActiveRecord::Base)
    ActiveRecord::Base.connection.disconnect!
  end

  # Before forking, kill the master process that belongs to the .oldbin PID.
  # This enables 0 downtime deploys.
  old_pid = "/tmp/unicorn.canvas-lms.pid.oldbin"
  if File.exists?(old_pid) && server.pid != old_pid
    begin
      Process.kill("QUIT", File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
      # someone else did our job for us
    end
  end
end

after_fork do |server, worker|
  # The following is *required* for Rails + "preload_app true",
  if defined?(ActiveRecord::Base)
    ActiveRecord::Base.establish_connection
  end
end