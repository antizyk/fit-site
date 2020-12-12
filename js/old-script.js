'use strict';

document.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function tabHideContent() {
		tabsContent.forEach(item => {
			item.style.display = 'none';
		});
		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].style.display = 'block';
		tabs[i].classList.add('tabheader__item_active');
	}



	tabHideContent();
	showTabContent();

	tabsParent.addEventListener('click', (e) => {
		const target = e.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					tabHideContent();
					showTabContent(i);
				}
			});
		}
	});

	//Modal
	//---Переменные для кода
	const openIcon = document.querySelectorAll('[data-modal]'),
		closeIcon = document.querySelector('[data-close]'),
		body = document.querySelector('body'),
		timerId = setTimeout(showModal, 5000),
		modal = document.querySelector('.modal');
	//========================================

	//---Функции
	function removeShow() {
		modal.classList.remove('show');
		body.classList.remove('stop-scroll');
	}

	function showModal() {
		modal.classList.add('show');
		body.classList.add('stop-scroll');
		clearInterval(timerId);
	}

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
			showModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	//=======================================

	//Код позволяющий открыть окно
	openIcon.forEach(item => {
		item.addEventListener('click', showModal);
	});

	window.addEventListener('scroll', showModalByScroll);
	//==============================

	//Код позволяющий закрыть окно
	document.addEventListener('keydown', e => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			console.log('lala');
			removeShow();
		}
	});

	modal.addEventListener('click', e => {
		const modalTarget = e.target;
		if (modalTarget && modalTarget === modal) {
			removeShow();
		}
	});
	closeIcon.addEventListener('click', removeShow);
	//============================
});