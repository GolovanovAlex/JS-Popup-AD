const popup = document.querySelector('.popup');
const skipBtn = document.querySelector('.popup__skip-btn');
const visitBtn = document.querySelector('.popup__link');

let remainingTime = 5;
let allowedToSkip = false;
let popupTimer;

const createPopupCookie = () => {
  let expiresDays = 30;
  let date = new Date();
  date.setTime(date.getTime() + expiresDays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + date.toUTCString();
  document.cookie = `popupCookie=true; ${expires}; path=/;`;
};

const showAd = () => {
  popup.classList.add('active');
  popupTimer = setInterval(() => {
    skipBtn.innerHTML = `Skip in ${remainingTime}s`;
    remainingTime--;

    if (remainingTime < 0) {
      allowedToSkip = true;
      skipBtn.innerHTML = 'Skip';
      skipBtn.classList.add('cursor');
      clearInterval(popupTimer);
    }
  }, 1000);
};

const skipAd = () => {
  popup.classList.remove('active');
  createPopupCookie();
};

skipBtn.addEventListener('click', () => {
  if (allowedToSkip) {
    skipAd();
  }
});

const startTimer = () => {
  if (window.scrollY > 100) {
    showAd();
    window.removeEventListener('scroll', startTimer);
  }
};

if (!document.cookie.match(/^(.*;)?\s*popupCookie\s*=\s*[^;]+(.*)?$/)) {
  window.addEventListener('scroll', startTimer);
}
