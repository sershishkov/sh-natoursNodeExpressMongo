/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';

//Dom Element
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');
const logiOutBtn = document.querySelector('.nav__el--logout');

//Values

//Delegation
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}

if (logiOutBtn) logiOutBtn.addEventListener('click', logout);
