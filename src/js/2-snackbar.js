import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(form);
  const delay = parseInt(formData.get('delay'), 10);
  const state = formData.get('state');

  if (isNaN(delay) || !state) {
    iziToast.error({
      title: 'Error',
      message: 'Please provide valid inputs',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  createNotificationPromise(delay, state)
    .then(message => {
      iziToast.success({
        title: 'Success',
        message,
        position: 'topRight',
        timeout: 3000,
      });
    })
    .catch(message => {
      iziToast.error({
        title: 'Error',
        message,
        position: 'topRight',
        timeout: 3000,
      });
    });
});

function createNotificationPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}
