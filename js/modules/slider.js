function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
	//SLIDER
	const slides = document.querySelectorAll(slide),
		slider = document.querySelector(container),
		prev = document.querySelector(prevArrow),
		next = document.querySelector(nextArrow),
		total = document.querySelector(totalCounter),
		slidesWrapper = document.querySelector(wrapper),
		slidesField = document.querySelector(field),
		width = window.getComputedStyle(slidesWrapper).width,

		current = document.querySelector(currentCounter);
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

}

export default slider;