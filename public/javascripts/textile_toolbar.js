var TextileToolbar = {
	toggle:function(id) {
		if ($(id + '_filter_id').value == 'Textile') {
			Element.insert(id + '_content', {before:'<div id="textile_toolbar_' + id + '">(textile toolbar)</div>'});
		} else {
			if ($('textile_toolbar_' + id))
				$('textile_toolbar_' + id).remove();
		}
	}
};

Event.addBehavior({
	'#part_0_filter_id:change' : function(e) {
		TextileToolbar.toggle('part_0');
  }
});

Event.onReady(function() {
	TextileToolbar.toggle('part_0');
});