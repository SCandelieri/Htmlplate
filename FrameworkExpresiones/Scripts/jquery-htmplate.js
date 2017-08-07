(function ($) {
	
	$.fn.htmplate = function(templatePath, data, functions) {
		var self = this;
		getHtmlTemplate(templatePath, function (response) {
			var htmlStr = parseHtml(response, data, functions);
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

	//TODO: Manage exceptions.
	function parseHtml(htmlStr, data, functions) {
		return htmlStr.replace(/{{[^{}]*}}/g, function(match) {
			var variableNames = getArrayFromExpression(match);
			return evaluateExpression(variableNames, data, functions);
		});
	}

	//TODO: Manage exceptions.
	function getArrayFromExpression(expression) {
		return expression.slice(2, expression.length - 2)
						 .split("|")
						 .map(function (variableName) { return variableName.trim(); });
	}

	//TODO: Manage exceptions.
	function evaluateExpression(variableNames, data, functions) {
		var variableName = variableNames[0];
		var functionNames = variableNames.slice(1, variableNames.length);
		return functionNames.reduce(function (acum, functionName) {
			return functions[functionName](acum);
		}, data[variableName]);
	}

})(jQuery);