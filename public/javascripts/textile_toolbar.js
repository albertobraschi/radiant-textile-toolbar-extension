var TextileToolbar = {
	toggle:function(id) {
		if ($(id + '_filter_id').value == 'Textile') {
			toolbar = '<a href="#" onclick="TextileToolbar.surround_selection(\'part_0_content\', \'*\', \'*\'); return false;"><img alt="Make selection bold" height="22" src="/images/textile_toolbar/bold.png" width="23"' +
					'/></a>&nbsp;<a href="#" onclick="TextileToolbar.surround_selection(\'part_0_content\', \'_\', \'_\'); return false;"><img alt="Make selection italic" height="22" src="/images/textile_toolbar/italic.png" width="23"' +
					'/></a>&nbsp;<a href="#" onclick="TextileToolbar.surround_selection(\'part_0_content\', \'+\', \'+\'); return false;"><img alt="Make selection underlined" height="22" src="/images/textile_toolbar/underline.png" width="23"' +
					'/></a>&nbsp;<a href="#" onclick="TextileToolbar.insert_hyperlink(\'part_0_content\'); return false;"><img alt="Make hyperlink" height="22" src="/images/textile_toolbar/hyperlink.png" width="23"' +
					'/></a>&nbsp;<a href="#" onclick="TextileToolbar.insert_image(\'part_0_content\'); return false;"><img alt="Insert image" height="22" src="/images/textile_toolbar/image.png" width="23"' +
					'/></a>&nbsp;&nbsp;<small><a href="http://hobix.com/textile/" target="_blank">Textile</a>&nbsp;enabled</small>';
			Element.insert(id + '_content', {before:'<div id="textile_toolbar_' + id + '">' + toolbar + '</div>'});
		} else {
			if ($('textile_toolbar_' + id))
				$('textile_toolbar_' + id).remove();
		}
	},
	
	surround_selection:function(text_area, prefix, suffix) {
		text_area = $(text_area);
		if (document.selection) { //IE support
			text_area.focus();
			sel = document.selection.createRange();
			if (sel.text != "")
				sel.text = prefix + sel.text + suffix;
		} else if (text_area.selectionStart || text_area.selectionStart == '0') { //Mozilla/Firefox/Netscape 7+ support		
			var startPos = text_area.selectionStart;
			var endPos = text_area.selectionEnd;
			selected_text = text_area.value.substring(startPos, endPos);
			if (selected_text != "")
				text_area.value = text_area.value.substring(0, startPos) + prefix + selected_text + suffix +
											    text_area.value.substring(endPos, text_area.value.length);
		}
	},

	insert_at_selection:function(text_area, value) {
		text_area = $(text_area);
		if (document.selection) { //IE support
			text_area.focus();
			document.selection.createRange().text = value;
		} else if (text_area.selectionStart || text_area.selectionStart == '0') { //Mozilla/Firefox/Netscape 7+ support		
			var startPos = text_area.selectionStart;
			var endPos = text_area.selectionEnd;
			text_area.value = text_area.value.substring(0, startPos) + value +
											  text_area.value.substring(endPos, text_area.value.length);
		}
	},

	insert_hyperlink:function(text_area) {
		url = prompt("Enter URL for hyperlink:", "http://");
		TextileToolbar.surround_selection(text_area, '"', '":' + url);
	},

	insert_image:function(text_area) {
		url = prompt("Enter URL for image:", "http://");
		TextileToolbar.insert_at_selection(text_area, '!' + url + '!');
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