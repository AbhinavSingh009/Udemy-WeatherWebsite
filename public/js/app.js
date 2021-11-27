console.log('This is a client side script');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');




weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();
    const location = search.value;
    message1.textContent = 'Loading...';
    message2.textContent = '';
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.Error) {
                    message1.textContent = 'Error ' + data.Error;
                } else {
                    message1.textContent = data.location;
                    message2.textContent = data.forcast;
                }
            });
        }

    );

});