import { getResource } from '../services/services';

function cards() {
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

	/* 	fetch('http://localhost:3000/menu').then(data => data.json()).then(data => {
			console.log(data);
			data.forEach(({ img, altimg, title, descr, price }) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		}); */
	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({ img, altimg, title, descr, price }) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});
	/* axios.get('http://localhost:3000/menu')
		.then(data => {
			data.data.forEach(({ img, altimg, title, descr, price }) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		}); */
}

export default cards;