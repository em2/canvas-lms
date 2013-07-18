require 'rubygems'
require 'ruby-debug'

 
 # 
# = Hash Recursive Merge
# 
# Merges a Ruby Hash recursively, Also known as deep merge.
# Recursive version of Hash#merge and Hash#merge!.
# 
# Category::    Ruby
# Package::     Hash
# Author::      Simone Carletti <weppos@weppos.net>
# Copyright::   2007-2008 The Authors
# License::     MIT License
# Link::        http://www.simonecarletti.com/
# Source::      http://gist.github.com/gists/6391/
class Hash
  #
  # Recursive version of Hash#merge!
  # 
  # Adds the contents of +other_hash+ to +hsh+, 
  # merging entries in +hsh+ with duplicate keys with those from +other_hash+.
  # 
  # Compared with Hash#merge!, this method supports nested hashes.
  # When both +hsh+ and +other_hash+ contains an entry with the same key,
  # it merges and returns the values from both arrays.
  # 
  #    h1 = {"a" => 100, "b" => 200, "c" => {"c1" => 12, "c2" => 14}}
  #    h2 = {"b" => 254, "c" => 300, "c" => {"c1" => 16, "c3" => 94}}
  #    h1.rmerge!(h2)   #=> {"a" => 100, "b" => 254, "c" => {"c1" => 16, "c2" => 14, "c3" => 94}}
  #    
  # Simply using Hash#merge! would return
  # 
  #    h1.merge!(h2)    #=> {"a" => 100, "b" = >254, "c" => {"c1" => 16, "c3" => 94}}
  # 
  def rmerge!(other_hash)
    merge!(other_hash) do |key, oldval, newval| 
        oldval.class == self.class ? oldval.rmerge!(newval) : newval
    end
  end
 
  #
  # Recursive version of Hash#merge
  # 
  # Compared with Hash#merge!, this method supports nested hashes.
  # When both +hsh+ and +other_hash+ contains an entry with the same key,
  # it merges and returns the values from both arrays.
  # 
  # Compared with Hash#merge, this method provides a different approch
  # for merging nasted hashes.
  # If the value of a given key is an Hash and both +other_hash+ abd +hsh
  # includes the same key, the value is merged instead replaced with
  # +other_hash+ value.
  # 
  #    h1 = {"a" => 100, "b" => 200, "c" => {"c1" => 12, "c2" => 14}}
  #    h2 = {"b" => 254, "c" => 300, "c" => {"c1" => 16, "c3" => 94}}
  #    h1.rmerge(h2)    #=> {"a" => 100, "b" => 254, "c" => {"c1" => 16, "c2" => 14, "c3" => 94}}
  #    
  # Simply using Hash#merge would return
  # 
  #    h1.merge(h2)     #=> {"a" => 100, "b" = >254, "c" => {"c1" => 16, "c3" => 94}}
  # 
  def rmerge(other_hash)
    r = {}
    merge(other_hash)  do |key, oldval, newval| 
      r[key] = oldval.class == self.class ? oldval.rmerge(newval) : newval
    end
  end


  def deep_merge(second)
    merger = proc { |key, v1, v2| Hash === v1 && Hash === v2 ? v1.merge(v2, &merger) : v2 }
    self.merge(second, &merger)
  end
end


class MergeYmlFiles
  def initialize(args)
    @file_name_1 = args[0]
    @file_name_2 = args[1]
    @source_file_1 = YAML.load_file(args[0])
    @source_file_2 = YAML.load_file(args[1])
    @yml = {}
  end

  def run
    merged = @source_file_1.deep_merge(@source_file_2)
    File.open('config/locales/oiu.yml', 'w') do |out|
      YAML.dump(merged, out)
    end
  end
end


merger = MergeYmlFiles.new(ARGV)
merger.run

