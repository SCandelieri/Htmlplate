(function ($) {
	
	$.fn.htmplate = function(templatePath, data) {
		var htmlStr = getHtmlTemplate(templatePath);
		htmlStr = parseHtml(htmlStr, data);
		return this.html(htmlStr);
	}

	//TODO: Implement function.
	function getHtmlTemplate(templatePath) {
		return '<h1>{{ nombre }}</h1><b>{{ edad }}</b><p>{{nombre}}</p>';
	}

	function parseHtml(htmlStr, data) {
		$.each(data, function (key, value) {
			var regex = new RegExp('{{[ ]*' + key + '[ ]*}}', 'g');
			htmlStr = htmlStr.replace(regex, value);
		});
		return htmlStr;
	}

})(jQuery);