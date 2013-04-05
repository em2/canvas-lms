require 'rubygems'
require 'ruby-debug'


class LocalesChanger
  def initialize(args)
    @source_file = YAML.load_file('config/locales/generated/en.yml')
    @destination_file = YAML.load_file('config/locales/en_em2.yml')
    @word_to_change = args[0]
    @desired_word = args[1]
    @yml = {}
  end

  def run
    @source_file.each do |key, value|
      @yml = self.search(:key => key, :value => value)
      File.open('asdf.yml', 'w') do |out|
        YAML.dump(@yml, out)
      end
    end
  end

  def search(data={})
    yml = {}
    if !data[:value].is_a?(Hash) && data[:value] && data[:value].is_a?(String) && data[:value].include?(@word_to_change) && !data[:value].include?("%{")
      value = data[:value].gsub("#{@word_to_change}", "#{@desired_word}")
      return value
    elsif data[:value].is_a?(Hash)
      data[:value].each do |key, value|
        yml[data[:key]] = self.search(:key => key, :value => value)
      end
    end
    yml
  end
end


loc = LocalesChanger.new(ARGV)
loc.run