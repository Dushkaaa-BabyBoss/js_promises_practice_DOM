'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

function notification(message, isError = false) {
  const createNotfication = document.createElement('div');

  if (!isError) {
    createNotfication.classList.add('success');
  } else {
    createNotfication.classList.add('error');
  }

  createNotfication.setAttribute('data-qa', 'notification');
  createNotfication.textContent = message;

  document.body.appendChild(createNotfication);
}

// Перший проміс

const firstPromise = new Promise((resolve, reject) => {
  const timeOut = setTimeout(() => {
    resolve('First promise was rejected');
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timeOut);
    resolve('First promise was resolved');
  });
});

// Другий проміс

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

// Третій проміс

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false; // Відслідковує праву кнопку
  let rightClicked = false; // Відслідковує ліву кнопку

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then((message) => notification(message));

secondPromise.then((message) => notification(message));

thirdPromise.then((message) => notification(message));
