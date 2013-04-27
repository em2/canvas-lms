# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
set :output, "/u/apps/canvas-lms/shared/log/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever

every :day, :at => '1:20am' do
  runner "Report.calculate_them"
end

every :day, :at => '4:20am' do
  command "~/backup.sh mysql s3 emma-edc 2>&1 | mail -s \"Backup result for emma-edc\" jamescarbine@gmail.com"
end

every :reboot do
  command "cd /u/apps/canvas-lms/current && RAILS_ENV=production bundle exec unicorn_rails -c config/unicorn.rb -D"
  command "cd /u/apps/canvas-lms/current && RAILS_ENV=production bundle exec script/delayed_job start"
end