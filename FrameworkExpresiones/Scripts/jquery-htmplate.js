(function ($) {
	
	$.fn.htmplate = function(templatePath, data) {
		var htmlStr = getHtmlTemplate(templatePath);
		htmlStr = parseHtml(htmlStr, data);
		this.html(htmlStr);
		return this;
	}

	//TODO: Implement function.
	function getHtmlTemplate(templatePath) {
		return '<h1>Prueba vacía.</h1>';
	}

	//TODO: Implement function.
	function parseHtml(htmlStr, data) {
		return htmlStr;
	}

})(jQuery);