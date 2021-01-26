function slider() {
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
}

module.exports = slider;