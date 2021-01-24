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
		//timerId = setTimeout(showModal, 5000),
		modal = document.querySelector('.modal');
	//===============
	//Функции
	function showModal() {
		modal.classList.add('show');
		body.classList.add('stop-scroll');
		//clearTimeout(timerId);
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
	//Class
	class MenuCard {//Создание класса
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {//Создание конструктора, и перечня аргументов для объекта
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);//Привязка элемента 
			this.transfer = 27;
			this.changeToUAH();//Вызов метода при создания объекта
		}
		changeToUAH() {//Метод конвертор, который в последствии будет вызыватся при создании объекта
			this.price = this.price * this.transfer;
		}
		render() {//Метод добавляющий новый элемент в верстку на основе нового объекта
			const element = document.createElement('div');//Создаем элемент
			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `<img src=${this.src} alt=${this.alt}>
															<h3 class="menu__item-subtitle">${this.title}</h3>
															<div class="menu__item-descr">${this.descr}</div>
															<div class="menu__item-divider"></div>
															<div class="menu__item-price">
																	<div class="menu__item-cost">Цена:</div>
																	<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
															</div>`;//Жобавляем в него код HTML с свойствами объекта
			this.parent.append(element);//Добавляем жлемент в конец родителя
		}
	}
	new MenuCard(//Создаем объект
		"img/tabs/vegy.jpg",
		"vegy",
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной  ценой и высоким качеством!',
		229,
		'.menu .container',
		'menu__item',
		'big'
	).render();//И вызываем метод добавляющий элемент в верстку

	//ОТПРАВКА ЧЕРЕЗ XMLHttpRequest
	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'Loading...',
		success: 'Thanks!',
		failure: 'Error'
	}

	forms.forEach(form => {
		postData(form);
	});

	function postData(form) {
		form.addEventListener('submit', e => {
			e.preventDefault();

			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			statusMessage.textContent = message.loading;
			form.append(statusMessage);

			const request = new XMLHttpRequest();
			request.open('POST', 'server.php');

			//request.setRequestHeader('Content-type', 'multipart/form-data');
			const formData = new FormData(form);
			request.send(formData);
			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					statusMessage.textContent = message.success;
					form.reset();
					setTimeout(() => {
						statusMessage.remove();
					}, 2000);
				} else {
					statusMessage.textContent = message.failure;
				}
			});
		});
	}
	//=================
});