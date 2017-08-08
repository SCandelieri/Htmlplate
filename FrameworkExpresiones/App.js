$(document).ready(function () {
	var functions = {
		mapDebts: function(debts) { return debts.map(function(debt) { return debt.precio; });}
	};
	$('span.content').htmplate('template.html', {
		nombre: "Santiago",
		edad: 21,
		deudas: [{ precio: 234.12 }, { precio: 453.98 }, { precio: 123.21 }]
	}, functions);
	$('div.content').htmplate('TemplateTest/template2.html', {
		nombre: "Cardif Paquete 1",
		precio: 21.259,
		fechaVencimiento: new Date()
	}, functions);
});