'use strict';

let id;
let timeGame = 0;

const userModal = $('#user-modal');
const selectElements = $('select.styled-select');
const alert = $('#validation-alert');

const user = { sex: 'F' };

const handleSexChange = (e, sex) => {
  if (e) {
    user.sex = e.target.value;
  } else {
    user.sex = sex.substr(0, 1);
    $(`#${sex.toLowerCase()}`).prop('checked', true);
  }

  $('#user-submit').removeAttr('disabled');
};

const handleSelectChange = e => {
  if (e.target.value !== '') {
    e.target.style = 'color:black';
  } else {
    e.target.style = '';
  }
};

const validateUser = () => {
  if (user.sex !== 'M' && user.sex !== 'F') return false;
  if (isNaN(user.income) || user.income < 0) return false;
  if (isNaN(user.age) || user.age < 6 || user.age > 150) return false;
  if (isNaN(user.carsOwned) || user.carsOwned < 0 || user.carsOwned > 100) return false;
  if (user.licence === '') return false;
  if (user.status === '') return false;
  if (user.currentlyHasCar === '') return false;

  return user.knowledge !== '';
};

if (window.location.pathname.includes('/game/')) {
  id = window.location.pathname.substr(6);

  startGame();
  timeGame =  (new Date()).getTime();
} else {
  userModal.modal('show');
}

$('#user-submit').on('click touchstart', e => {
  user.age = parseInt($('#age').val(), 10);
  user.status = $('#status').val();
  user.income = parseInt($('#income').val(), 10);
  user.knowledge = $('#knowledge').val();
  user.carsOwned = parseInt($('#cars-owned').val(), 10);
  user.licence = $('#licence').val();
  user.currentlyHasCar = $('#current').val();

  if (validateUser()) {
    $.post('/user', user, userId => {
      id = userId;

      if (Math.random() > 0.5) {
        window.location.href = `http://161.53.19.74/limesurvey/index.php/admin/index?userID=${id}&BQ=0`;
      } else {
        userModal.modal('hide');

        startGame();
        timeGame =  (new Date()).getTime();
      }
    });
  } else {
    alert.attr('style', 'display: block');
    e.target.blur();
  }
});

$('div.sex-container div.sex-wrapper input').change(handleSexChange);

$('.sex-image').on('click', e => {
  handleSexChange(null, e.target.alt);
});

selectElements.change(handleSelectChange);
