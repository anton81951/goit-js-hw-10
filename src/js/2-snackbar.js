import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const delayInput = document.querySelector('input[name="delay"]');
    const delay = delayInput.value;

    const stateInput = document.querySelector('input[name="state"]:checked');
    const state = stateInput ? stateInput.value : null;

    const notificationPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else if (state === 'rejected') {
                reject(delay);
            } else {
                reject('No selection');
            }
        }, delay);
    });

    notificationPromise
        .then((value) => {
            console.log(`✅ Fulfilled promise in ${delay}ms`);
            iziToast.success({
                title: 'Success',
                message: `Fulfilled`,
                position: 'topCenter'
            });
        })
        .catch((value) => {
            console.error(`❌ Rejected promise in ${delay}ms`);
            iziToast.error({
                title: 'Error',
                message: '❌ Rejected`',
                position: 'topCenter'
            });
        });
    form.reset();
});
