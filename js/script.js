'use strict';

document.addEventListener('DOMContentLoaded', () => {
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
});