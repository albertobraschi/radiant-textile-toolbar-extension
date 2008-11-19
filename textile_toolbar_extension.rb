# Uncomment this if you reference any of your controllers in activate
require_dependency 'application'

class TextileToolbarExtension < Radiant::Extension
  version "1.0"
  description "Adds toolbars to Textile-enabled text areas in the admin."
  url "http://dev.radiantcms.org/radiant/browser/trunk/extensions/textile-toolbar"
  
  def activate
    Admin::PageController.class_eval do
      before_filter :set_textile_toolbar_javascript
      def set_textile_toolbar_javascript
        %w(lowpro textile_toolbar).each { |e| include_javascript e }
      end
    end
  end
end

# Soli Deo Gloria!
