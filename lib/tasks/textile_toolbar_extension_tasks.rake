namespace :radiant do
  namespace :extensions do
    namespace :textile_toolbar do
      
      desc "Runs the migration of the Textile Toolbar extension"
      task :migrate => :environment do
        require 'radiant/extension_migrator'
        if ENV["VERSION"]
          TextileToolbarExtension.migrator.migrate(ENV["VERSION"].to_i)
        else
          TextileToolbarExtension.migrator.migrate
        end
      end
      
      desc "Copies public assets of the Textile Toolbar to the instance public/ directory."
      task :update => :environment do
        is_svn_or_dir = proc {|path| path =~ /\.svn/ || File.directory?(path) }
        Dir[TextileToolbarExtension.root + "/public/**/*"].reject(&is_svn_or_dir).each do |file|
          path = file.sub(TextileToolbarExtension.root, '')
          directory = File.dirname(path)
          puts "Copying #{path}..."
          mkdir_p RAILS_ROOT + directory
          cp file, RAILS_ROOT + path
        end
      end  
    end
  end
end
