# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

task :freedom do
  Bundler.with_clean_env { sh "heroku" }
end

require_relative 'config/application'

Rails.application.load_tasks
