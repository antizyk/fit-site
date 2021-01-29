function showModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('show');
	document.querySelector('body').classList.add('stop-scroll');
	console.log(modalTimerId);
	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}
function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.remove('show');
	document.querySelector('body').classList.remove('stop-scroll');
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	//Переменные
	const btn = document.querySelectorAll(triggerSelector),
		body = document.querySelector('body'),

		modal = document.querySelector(modalSelector);
	//===============
	//Функции
	function scrollOfShow() {
		if (document.documentElement.clientHeight + window.pageYOffset === document.documentElement.scrollHeight) {
			window.removeEventListener('scroll', scrollOfShow);
		}
	}
	//===============
	//Код открывающий попап
	btn.forEach(item => {
		item.addEventListener('click', () => { showModal(modalSelector, modalTimerId); });
	});

	window.addEventListener('scroll', scrollOfShow);

	//===============
	//Код закрывающий попап


	modal.addEventListener('click', e => {//Закрытие по темной области
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', e => {//Закрытие по Esc
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});

	//===============

}

export default modal;
export { showModal };
export { closeModal };