# frozen_string_literal: true

require 'yaml'
require 'fileutils'

data_dir = '../_data'

sections = YAML.load_file("#{data_dir}/sections.yml")
regions_data = YAML.load_file("#{data_dir}/regions.yml")
regions = regions_data['regions']

# Region loop
regions.each do |region|
  puts region

  dest_dir = "/tmp/#{region}"
  unless File.exist?(dest_dir)
    Dir.mkdir(dest_dir) unless File.exist?(dest_dir)
    files = Dir.glob('../*').reject { |file| file.end_with?('../.') }
    FileUtils.cp_r(files, dest_dir)
  end

  # Category loop
  sections.each do |section|
    data = YAML.load_file("#{data_dir}/#{section['id']}.yml")
    websites = data['websites']
    section_array = []

    next unless section['id'].to_s == 'banking'

    # Website loop
    websites.each do |website|

      if website['region'].nil?
        section_array.push(website)
      else
        section_array.push(website) if website['region'] == region.to_s
      end

    end
    website_array = {websites: section_array}
    website_yaml = website_array.to_yaml.gsub("---\n:", '')

    File.open("#{dest_dir}/_data/#{section['id']}.yml", 'w') do |file|
      file.write website_yaml
    end

    puts(section_array)
  end
  out_dir = "#{Dir.pwd}/../#{region}"
  puts "Building #{region}..."
  puts `cd #{dest_dir}; pwd; ls -la; bundle exec jekyll build -d #{out_dir} --config _config-regions.yml -V`
  puts `cd #{out_dir}; rm -R -- */` # Delete Subdirectories
  puts "#{region} built!"
end
