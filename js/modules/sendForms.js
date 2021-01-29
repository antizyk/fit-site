
import showThanksModal from './modalStatus';
import { postData } from '../services/services';


function sendForms(formSelector, timerId) {
	//ОТПРАВКА ЧЕРЕЗ XMLHttpRequest
	const forms = document.querySelectorAll(formSelector);

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Thanks!',
		failure: 'Error'
	}

	forms.forEach(form => {
		bindPostData(form);
	});



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
					showThanksModal(message.success, timerId);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure, timerId);
				}).finally(() => {
					form.reset();
				});
		});
	}
	//=================
}

export default sendForms;