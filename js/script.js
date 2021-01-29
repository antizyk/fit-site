'use strict';
import timer from './modules/timer';
import cards from './modules/cards';
import modal from './modules/modal';
import sendForms from './modules/sendForms';
import slider from './modules/slider';
import tabs from './modules/tabs';
import { showModal } from './modules/modal';
import calc from './modules/calc';
document.addEventListener('DOMContentLoaded', () => {
	const timerId = setTimeout(() => showModal('.modal', timerId), 500000);

	calc();
	timer('.timer', '2021-02-14');
	cards();
	modal('[data-modal]', '.modal', timerId);
	sendForms('form', timerId);
	slider({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');

});