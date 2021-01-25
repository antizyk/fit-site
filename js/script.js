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
	const timeToBithDay = '2021-01-26';

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


	modal.addEventListener('click', e => {//Закрытие по темной области
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
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
	const getResource = async (url) => {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
	};
	/* getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({ img, altimg, title, descr, price }) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		}); */

	axios.get('http://localhost:3000/menu')
		.then(data => {
			data.data.forEach(({ img, altimg, title, descr, price }) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});

	//ОТПРАВКА ЧЕРЕЗ XMLHttpRequest
	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Thanks!',
		failure: 'Error'
	}

	forms.forEach(form => {
		bindPostData(form);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', e => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
			display: block;
			margin: 0 auto;
			`;
			form.append(statusMessage);
			form.insertAdjacentElement('afterend', statusMessage);


			const formData = new FormData(form);
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});
		});
	}
	//=================
	//CREATE MODAL WINDOW FOR SEND FORMS
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		prevModalDialog.classList.add('hide');
		showModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
			<div data-close class="modal__close">X</div>
			<div class="modal__title">${message}</div>
		</div>
		`;

		document.querySelector('.modal').append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}
	//=================

	//SLIDER
	const slides = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesField = document.querySelector('.offer__slider-inner'),
		width = window.getComputedStyle(slidesWrapper).width,

		current = document.querySelector('#current');
	let widthNum = +width.replace(/\D/ig, '');
	let slideIndex = 1;
	let offset = 0;


	function setActiveDot() {
		dots.forEach((item, num, arr) => {
			if (num === slideIndex - 1) {
				item.style.opacity = 1;
			} else {
				item.style.opacity = 0.5;
			}
		})
	}
	function setSlideIndex() {
		if (slides.length < 10 || slideIndex < 10) {
			total.textContent = `0${slides.length}`;
			current.textContent = `0${slideIndex}`;
		} else {
			total.textContent = slides.length;
			current.textContent = slideIndex;
		}
	}
	setSlideIndex();

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slider.style.position = 'relative';
	const indicators = document.createElement('ol');
	indicators.classList.add('carousel-indicators');
	slider.append(indicators);
	for (let i = 0; i <= slides.length - 1; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slider-to', i + 1);
		dot.classList.add('dot');
		indicators.append(dot);
	}
	const dots = document.querySelectorAll('.dot');
	setActiveDot();
	slides.forEach(slide => {
		slide.style.width = width;
	});
	dots.forEach((item, num) => {
		item.addEventListener('click', e => {
			if (item == e.target) {
				offset = num * widthNum;
				slideIndex = num + 1;
				slidesField.style.transform = `translateX(-${offset}px)`;
				setSlideIndex();
				setActiveDot();
			}
		})
	})


	next.addEventListener('click', () => {
		if (offset == widthNum * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += widthNum;
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1
		} else {
			slideIndex++;
		}
		setSlideIndex();
		setActiveDot();
	})

	prev.addEventListener('click', () => {
		if (offset === 0) {
			offset = widthNum * (slides.length - 1)
		} else {
			offset -= widthNum;
		}
		slidesField.style.transform = `translateX(-${offset}px)`;
		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}
		setSlideIndex();
		setActiveDot();
	})
	//======
	//CALCULATOR
	const result = document.querySelector('.calculating__result span');

	let sex,
		height,
		weight,
		age,
		ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}
	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);
		elements.forEach(element => {
			element.classList.remove(activeClass);
			if (element.getAttribute('id') === localStorage.getItem('sex')) {
				element.classList.add(activeClass);
			}
			if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				element.classList.add(activeClass);
			}
		});
	}
	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '______';
			return;
		}
		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	calcTotal();


	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(item => {
			item.addEventListener('click', () => {
				if (item.getAttribute('data-ratio')) {
					ratio = +item.getAttribute('data-ratio');
					localStorage.setItem('ratio', +item.getAttribute('data-ratio'));
				} else {
					sex = item.getAttribute('id');
					localStorage.setItem('sex', item.getAttribute('id'));
				}
				elements.forEach(item => item.classList.remove(activeClass));
				item.classList.add(activeClass);
				calcTotal();
			})
		})
	}

	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {
			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
			}
			switch (input.getAttribute('id')) {
				case 'height': height = +input.value;
					break;
				case 'weight': weight = +input.value;
					break;
				case 'age': age = +input.value;
					break;
			}
			calcTotal();
		})
	}

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
	//==========
});