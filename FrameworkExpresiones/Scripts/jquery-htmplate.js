(function ($) {
	
	$.fn.htmplate = function(templatePath, data) {
		var self = this;
		getHtmlTemplate(templatePath, function (response) {
			var htmlStr = parseHtml(response, data);
			self.html(htmlStr);
		});
		return self;
	}

	//TODO: Change AJAX call to allow cross site. Manage exceptions.
	function getHtmlTemplate(templatePath, callbackFn) {
		$.get(templatePath, function (response) {
			callbackFn(response);
		});
	}

	//TODO: Change function to allow more complex expressions. Manage exceptions.
	function parseHtml(htmlStr, data) {
		$.each(data, function (key, value) {
			var regex = new RegExp('{{[ ]*' + key + '[ ]*}}', 'g');
			htmlStr = htmlStr.replace(regex, value);
		});
		return htmlStr;
	}

})(jQuery);