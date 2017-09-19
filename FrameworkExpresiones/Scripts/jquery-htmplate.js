'use strict';

(function ($, undefined) {

	$.fn.htmplate = function(templatePath, data, functions) {
		var self = this;
		var funcs = $.extend({}, $.fn.htmplate.functions, functions);
		getHtmlTemplate(templatePath, function(response) {
			var htmlStr = parseHtml(response, data, funcs);
			self.html(htmlStr);
		});
		return self;
	}

	$.fn.htmplate.functions = {
		toCurrency: function(number) {
			return (typeof number === 'number') ? '$' + number.toFixed(2).toString() : '';
		},

		toDateString: function(date) {
			return (typeof date === 'object' && Date.prototype.isPrototypeOf(date))
				? date.toLocaleDateString() : '';
		},

		toJSON: function(obj) {
			return JSON.stringify(obj);
		},

		toLowerCase: function (str) {
			return (typeof str === 'string') ? str.toLowerCase() : '';
		},

		toUpperCase: function(str) {
			return (typeof str === 'string') ? str.toUpperCase() : '';
		},

		toString: function (obj) {
			return obj.toString();
		}
	};

	//TODO: Change AJAX call to allow cross site. Manage exceptions.
	function getHtmlTemplate(templatePath, callbackFn) {
		$.get(templatePath, callbackFn);
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
						.split('|')
						.map(function(variableName) { return variableName.trim(); });
	}

	//TODO: Manage exceptions.
	function evaluateExpression(variableNames, data, functions) {
		var variableName = variableNames[0];
		var functionNames = variableNames.slice(1, variableNames.length);
		var expressionResult = functionNames.reduce(function(acum, functionName) {
			return functions[functionName](acum);
		}, data[variableName]);
		return (!expressionResult) ? '' : expressionResult;
	}

})(jQuery);