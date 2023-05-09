const popup = document.querySelector('.popup');
const skipBtn = document.querySelector('.popup__skip-btn');
const visitBtn = document.querySelector('.popup__link');

// ---- ---- time skip ---- ---- //
let remainingTime = 5;
let allowedToSkip = false;
let popupTime;

// ---- ---- popup add active ---- ---- //
const showAd = () => {
  if (window.scrollY > 100) {
    popup.classList.add('active');
    popupTime = setInterval(() => {
      console.log(remainingTime);
      skipBtn.innerHTML = `Skip in ${remainingTime}s`;
      remainingTime--;
      if (remainingTime < 0) {
        allowedToSkip = true;
        clearInterval(popupTime);
        skipBtn.innerHTML = 'Skip';
        skipBtn.classList.add('cursor');
      }
    }, 1000);
  }
};
const startTimer = () => {
  if (window.scrollY > 100) {
    showAd();
    window.removeEventListener('scroll', startTimer);
  }
};
window.addEventListener('scroll', startTimer);

// ---- ---- skipButton remove active ---- ---- //
const skipAd = () => {
  popup.classList.remove('active');
};
skipBtn.addEventListener('click', () => {
  if (allowedToSkip) {
    skipAd();
  }
});
