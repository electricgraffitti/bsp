source 'http://rubygems.org'

gem 'rails', '3.1.3'
gem 'mysql2'
gem 'capistrano', '2.5.19'
gem 'capistrano-ext'
gem 'authlogic'
gem 'aws-s3'
gem 'json'
gem "carrierwave"
gem 'mini_magick'
gem "fog"
gem "zencoder"
gem "stripe"
gem "createsend"

group :production do
  gem "exception_notification"
  gem 'newrelic_rpm'
end

group :development do
  gem 'debugger'
  gem 'thin'
  gem 'rspec-rails'
  gem 'bullet'
  gem 'ruby-growl'
  gem 'xmpp4r'
  gem 'jasmine'
  gem 'zencoder-fetcher'
  gem 'annotate', :git => 'git://github.com/ctran/annotate_models.git'
end

group :test do
  gem "rspec-rails"
  gem 'turn', '~> 0.8.3', :require => false
end