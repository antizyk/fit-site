function modal() {
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

}

module.exports = modal;