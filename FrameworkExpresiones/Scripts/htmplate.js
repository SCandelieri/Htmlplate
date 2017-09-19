'use strict';

(function (Htmplate) {

	Htmplate.prototype = function (selector, templatePath, data, functions) {
		var funcs = Object.assign({}, Htmplate.functions, functions);
		getHtmlTemplate(templatePath, function (response) {
			var htmlStr = parseHtml(response, data, funcs);
			var elements = document.querySelectorAll(selector);
			for (var i = 0; i < elements.length; i++)
				elements[i].innerHTML = htmlStr;
		});
	};

	Htmplate.functions = {
		toCurrency: function (number) {
			return (typeof number === 'number') ? '$' + number.toFixed(2).toString() : '';
		},

		toDateString: function (date) {
			return (typeof date === 'object' && Date.prototype.isPrototypeOf(date))
				? date.toLocaleDateString() : '';
		},

		toJSON: function (obj) {
			return JSON.stringify(obj);
		},

		toLowerCase: function (str) {
			return (typeof str === 'string') ? str.toLowerCase() : '';
		},

		toUpperCase: function (str) {
			return (typeof str === 'string') ? str.toUpperCase() : '';
		},

		toString: function (obj) {
			return obj.toString();
		}
	};

	//TODO: Change AJAX call to allow cross site. Manage exceptions.
	function getHtmlTemplate(templatePath, callbackFn) {
		var xhttp = new XMLHttpRequest();
		xhttp.onloadend = function () {
			if (this.readyState === 4 && this.status === 200)
				callbackFn(this.responseText);
		};
		xhttp.open('GET', templatePath, true);
		xhttp.send();
	}

	//TODO: Manage exceptions.
	function parseHtml(htmlStr, data, functions) {
		return htmlStr.replace(/{{[^{}]*}}/g, function (match) {
			var variableNames = getArrayFromExpression(match);
			return evaluateExpression(variableNames, data, functions);
		});
	}

	//TODO: Manage exceptions.
	function getArrayFromExpression(expression) {
		return expression.slice(2, expression.length - 2)
						.split('|')
						.map(function (variableName) { return variableName.trim(); });
	}

	//TODO: Manage exceptions.
	function evaluateExpression(variableNames, data, functions) {
		var variableName = variableNames[0];
		var functionNames = variableNames.slice(1, variableNames.length);
		var expressionResult = functionNames.reduce(function (acum, functionName) {
			return functions[functionName](acum);
		}, data[variableName]);
		return (!expressionResult) ? '' : expressionResult;
	}

})(window.Htmplate = window.Htmplate || function (selector, templatePath, data, functions) {
	window.Htmplate.prototype(selector, templatePath, data, functions);
});