require 'rubygems'
require 'ruby-debug'


class LocalesChanger
  def initialize(args)
    @source_file = YAML.load_file('config/locales/generated/en.yml')
    @word_to_change1 = args[0] ? args[0] : ""
    @desired_word1 = args[1] ? args[1] : ""
    @word_to_change2 = args[2] ? args[2] : ""
    @desired_word2 = args[3] ? args[3] : ""
    @word_to_change3 = args[4] ? args[4] : ""
    @desired_word3 = args[5] ? args[5] : ""
    @word_to_change4 = args[6] ? args[6] : ""
    @desired_word4 = args[7] ? args[7] : ""
    @yml = {}
  end

  def run
    @source_file.each do |key, value|
      @yml = self.search(:key => key, :value => value)
      File.open('config/locales/asdf.yml', 'w') do |out|
        YAML.dump(@yml, out)
      end
    end
  end

  def search(data={})
    yml = {}
    if !data[:value].is_a?(Hash) && data[:value] && data[:value].is_a?(String) && data[:value].include?(@word_to_change1) && !data[:value].include?("%{")
      value = data[:value].gsub("#{@word_to_change1}", "#{@desired_word1}")
      return { data[:key] => value }
    elsif !data[:value].is_a?(Hash) && data[:value] && data[:value].is_a?(String) && data[:value].include?(@word_to_change2) && !data[:value].include?("%{")
      value = data[:value].gsub("#{@word_to_change2}", "#{@desired_word2}")
      return { data[:key] => value }
    elsif !data[:value].is_a?(Hash) && data[:value] && data[:value].is_a?(String) && data[:value].include?(@word_to_change3) && !data[:value].include?("%{")
      value = data[:value].gsub("#{@word_to_change3}", "#{@desired_word3}")
      return { data[:key] => value }
    elsif !data[:value].is_a?(Hash) && data[:value] && data[:value].is_a?(String) && data[:value].include?(@word_to_change4) && !data[:value].include?("%{")
      value = data[:value].gsub("#{@word_to_change4}", "#{@desired_word4}")
      return { data[:key] => value }
    elsif data[:value].is_a?(Hash)
      data[:value].each do |key, value|
        if yml[data[:key]].nil?
          asdf = self.search(:key => key, :value => value)
          if asdf.is_a?(Hash)
            yml[data[:key]] = asdf
          end
        else
          asdf = self.search(:key => key, :value => value)
          if asdf.is_a?(Hash)
            yml[data[:key]].merge!(asdf)
          end
        end
      end
    end
    yml.empty? ? "" : yml
  end
end


loc = LocalesChanger.new(ARGV)
loc.run