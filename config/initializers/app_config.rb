APP = YAML.load_file("#{Rails.root}/config/app_config.yml")[Rails.env]
S3 = YAML.load_file("#{Rails.root}/config/s3.yml")