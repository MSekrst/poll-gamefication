'use strict';

const userModal = $('#user-modal');
const selectElements = $('select.styled-select');

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
  if (user.status === '') return false;

  return user.knowledge !== '';
};

userModal.modal('show');

const alert = $('#validation-alert');

let id;
let timeGame = 0;
$('#user-submit').on('click touchstart', e => {
  user.age = parseInt($('#age').val(), 10);
  user.status = $('#status').val();
  user.income = parseInt($('#income').val(), 10);
  user.knowledge = $('#knowledge').val();

  if (!validateUser()) {
    startGame();

    $.post('/user', user, userId => {
      id = userId;
    });

    userModal.modal('hide');
    timeGame =  (new Date()).getTime();
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
