'use strict';

document.addEventListener('DOMContentLoaded', () => {
	const cards = require('./modules/cards'),
		modal = require('./modules/modal'),
		modalStatus = require('./modules/modalStatus'),
		sendForms = require('./modules/sendForms'),
		slider = require('./modules/slider'),
		tabs = require('./modules/tabs'),
		timer = require('./modules/cards');

	cards();
	modal();
	modalStatus();
	sendForms();
	slider();
	tabs();
	timer();
});