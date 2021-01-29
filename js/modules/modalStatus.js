import { showModal, closeModal } from './modal';


function showThanksModal(message, timerId) {
	const prevModalDialog = document.querySelector('.modal__dialog');
	prevModalDialog.classList.add('hide');
	showModal('.modal', timerId);

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
		closeModal('.modal');
	}, 4000);
}
//=================


export default showThanksModal;