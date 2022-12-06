import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {CustomSelect} from './modules/select/custom-select';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    const select = new CustomSelect();
    select.init();
    const form = new Form();
    window.form = form;
    form.init();
  });
});


document.querySelector('.burger').addEventListener('click', function () {
  document.querySelector('.burger span').classList.toggle('active');
  document.querySelector('.menu__list').classList.toggle('animate');
  document.querySelector('body').classList.toggle('open-menu');
});


function appearCountries() {
  const countryCircles = document.querySelectorAll('.circle__country');
  const orbit = document.querySelector('.illustration__circle');
  const countries = ['1', '2', '3', '4', '5'];
  const renderCountries = new Promise((resolve) => {
    setTimeout(() => {
      countryCircles.forEach((item, i) => {
        setTimeout(() => {
          item.classList.add(`circle__country--active--${countries[i]}`);
          // eslint-disable-next-line no-unused-expressions
          i === countries.length - 1 ? resolve() : null;
        }, i * 400);
      });
    }, 3000);
  });

  renderCountries.then(() => {
    setTimeout(() => {
      orbit.style.animation = 'rotation 20s linear infinite';
      countryCircles.forEach((item) => {
        item.style.animation = 'rotationBack 20s linear infinite';
      });
    }, 200);
  });
}

appearCountries();


const MIN_NAME_LENGTH = 4;
const MAX_NAME_LENGTH = 12;

let stopSumb = (/[!@#$%^&*()]/);


let searcHeaderInput = document.querySelector('input');

searcHeaderInput.addEventListener('input', () => {
  const valueLength = searcHeaderInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    searcHeaderInput.setCustomValidity('Ещё' + ' ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');

  } else if (valueLength > MAX_NAME_LENGTH) {
    searcHeaderInput.setCustomValidity('Удалите лишнее' + (valueLength - MAX_NAME_LENGTH) + 'симв.');

  } else {
    searcHeaderInput.setCustomValidity('');
  }

  searcHeaderInput.reportValidity();

});

searcHeaderInput.addEventListener('input', function () {
  this.value = this.value.replace(stopSumb, '');
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
