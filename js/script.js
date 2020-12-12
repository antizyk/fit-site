'use strict';

document.addEventListener('DOMContentLoaded', () => {
	//Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		parentTabs = document.querySelector('.tabheader__items');

	function hideTabs() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show');
		});
		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}
	function showTabs(i = 0) {
		tabsContent[i].classList.add('show');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabs();
	showTabs();

	parentTabs.addEventListener('click', e => {
		let targetElement = e.target;

		if (targetElement && targetElement.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (tabs[i] == targetElement) {
					hideTabs();
					showTabs(i);
				}
			});
		}
	});

	//Timer
	const timeToBithDay = '2020-12-27';

	function timing(deadline) {
		const timeUntillTheEnd = Date.parse(timeToBithDay) - Date.parse(new Date()),
			days = Math.floor(timeUntillTheEnd / (1000 * 60 * 60 * 24)),
			hours = Math.floor((timeUntillTheEnd / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((timeUntillTheEnd / (1000 * 60)) % 60),
			seconds = Math.floor((timeUntillTheEnd / 1000) % 60);
		return {
			'allTime': timeUntillTheEnd,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function timerOutput(selector, timeToEnd) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timerId = setInterval(innerTime, 1000);

		function checkForZero(num) {
			if (num >= 0 && num < 10) {
				return `0${num}`;
			} else {
				return num;
			}
		}

		function innerTime() {
			const timeLeft = timing(timeToEnd);
			days.innerHTML = checkForZero(timeLeft.days);
			hours.innerHTML = checkForZero(timeLeft.hours);
			minutes.innerHTML = checkForZero(timeLeft.minutes);
			seconds.innerHTML = checkForZero(timeLeft.seconds);
			//console.log(timeLeft.hours < 10);

			if (timeLeft.allTime < 0) {
				clearInterval(timerId);
			}
		}

	}
	timerOutput('.timer', timeToBithDay);

	//Modal
	//Переменные
	const btn = document.querySelectorAll('[data-modal]'),
		btnClose = document.querySelector('[data-close]'),
		body = document.querySelector('body'),
		timerId = setTimeout(showModal, 5000),
		modal = document.querySelector('.modal');
	//===============
	//Функции
	function showModal() {
		modal.classList.add('show');
		body.classList.add('stop-scroll');
		clearTimeout(timerId);
	}
	function closeModal() {
		modal.classList.remove('show');
		body.classList.remove('stop-scroll');
	}

	function scrollOfShow() {
		if (document.documentElement.clientHeight + window.pageYOffset === document.documentElement.scrollHeight) {
			showModal();
			window.removeEventListener('scroll', scrollOfShow);
		}
	}
	//===============
	//Код открывающий попап
	btn.forEach(item => {
		item.addEventListener('click', showModal);
	});

	window.addEventListener('scroll', scrollOfShow);

	//===============
	//Код закрывающий попап
	btnClose.addEventListener('click', closeModal);//Закрытие по крестику

	modal.addEventListener('click', e => {//Закрытие по темной области
		if (e.target === modal) {
			closeModal();
		}
	});

	document.addEventListener('keydown', e => {//Закрытие по Esc
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	//===============
});