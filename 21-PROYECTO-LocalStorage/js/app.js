const listaTweets = document.getElementById('lista-tweets');

eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', agregarTweet);
    listaTweets.addEventListener('click', borrarTweet);
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

function agregarTweet(e) {
    e.preventDefault();
    const tweet = document.querySelector("#tweet").value.trim();

    if (tweet === '') {
        mostrarError('El tweet no puede estar en blanco');
        return;
    }

    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    const p = document.createElement('p');
    p.innerText = tweet;

    p.appendChild(botonBorrar);

    listaTweets.appendChild(p);

    agregarTweetLocalStorage(tweet);

    document.getElementById('formulario').reset();
}

function borrarTweet(e) {
    e.preventDefault();

    if (e.target.classList.contains('borrar-tweet')) {
        const tweetEliminado = e.target.parentElement.firstChild.textContent;
        e.target.parentElement.remove();
        borrarTweetLocalStorage(tweetEliminado);
    }
}

function localStorageListo() {
    let tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function (tweet) {
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        const p = document.createElement('p');
        p.innerText = tweet;

        p.appendChild(botonBorrar);

        listaTweets.appendChild(p);
    });
}

function agregarTweetLocalStorage(tweet) {
    let tweets = obtenerTweetsLocalStorage();
    tweets.push(tweet);

    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function obtenerTweetsLocalStorage() {
    let tweets;
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }

    return tweets;
}

function borrarTweetLocalStorage(tweet) {
    let tweets = obtenerTweetsLocalStorage();
    tweets = tweets.filter(t => t !== tweet);
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function mostrarError(mensaje) {
    const error = document.createElement('p');
    error.classList = 'error';
    error.innerText = mensaje;

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(error);

    setTimeout(() => {
        error.remove();
    }, 3000);
}
