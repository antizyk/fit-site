
function timer(id, deadline) {
	function getTimeRemaining(endtime) {//Функция которая высчитывает количество времени до события
		const t = Date.parse(endtime) - Date.parse(new Date()),//Высчитываем количество милисекунд до события
			days = Math.floor(t / (1000 * 60 * 60 * 24)),//Количество дней
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),//Часов
			minuts = Math.floor((t / 1000 / 60) % 60),//Минут
			seconds = Math.floor((t / 1000) % 60);//Секунд
		console.log(t);
		return {//Возврашаем объект с данными
			'total': t,
			'days': days,
			'hours': hours,
			'minuts': minuts,
			'seconds': seconds
		};
	}
	console.log('lalala');


	function getZero(num) {//Функция которая проверяет счетчик на значение 0 или меньше
		if (num >= 0 && num < 10) {//Если значение равно илибольше 0 но меньше 10
			return `0${num}`;//То подставляется 0 и значение
		} else if (num < 0) {//Если меньше нуля
			return 0;//ТО выводится ноль
		}
		else {//Иначе 
			return num;//выводится просто значение
		}
	}

	function setClock(selector, endtime) {//Функиция которая выводит значения в на страничку
		const timer = document.querySelector(selector),//Получаем элемент таймера в HTML
			days = timer.querySelector('#days'),//Получаем место для вывода дней
			hours = timer.querySelector('#hours'),//Получаем место для вывода часов
			minuts = timer.querySelector('#minutes'),//Получаем место для вывода минут
			seconds = timer.querySelector('#seconds'),//Получаем место для вывода секунд
			timeInterval = setInterval(updateClock, 1000);//Запускаем функцию вывода значений через каждую секунду

		updateClock();
		function updateClock() {//Функция которая передает время из объекта созданного в функции getTimeRemaining на страницу
			const t = getTimeRemaining(endtime);//Запускаем функцию высчитывающую время до события и ложим результат в переменную 
			days.innerHTML = getZero(t.days);//Из объекта с таймингом до события проверив на 0 выводим результат в таймер 
			minuts.innerHTML = getZero(t.minuts);//Из объекта с таймингом до события проверив на 0 выводим результат в таймер 
			seconds.innerHTML = getZero(t.seconds);//Из объекта с таймингом до события проверив на 0 выводим результат в таймер 
			hours.innerHTML = getZero(t.hours);//Из объекта с таймингом до события проверив на 0 выводим результат в таймер 
			console.log(t);
			if (t.total <= 0) {//Если значения 
				clearInterval(timeInterval);//Если время до события исчерпано останавливаем таймер
			}
		}
	}
	console.log(deadline);
	setClock(id, deadline);//Запускаем функцию вывода таймера
}
export default timer;