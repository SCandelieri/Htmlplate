$(document).ready(function () {
	$('span.content').htmplate('template.html', {
		nombre: "Santiago",
		edad: 21
	});
	$('div.content').htmplate('TemplateTest/template2.html', {
		nombre: "Cardif Paquete 1",
		precio: 21.25,
		fechaVencimiento: new Date()
	});
});