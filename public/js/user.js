'use strict';

const userModal = $('#user-modal');
var user = {sex: 'M'};

const handleSexChange = e => {
  user.sex = e.target.value;
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
    timeGame =  new Date()/ 1000;
    console.log(timeGame);
  } else {
    alert.attr('style', 'display: block');
    e.target.blur();
  }
});

$('div.sex-container div.sex-wrapper input').change(handleSexChange);

$('.sex-image').on('click', e => {
  if (e.target.alt === "Male") {
    $('#male').prop('checked', true);
    user.sex = "M";
  }
  if (e.target.alt === "Female") {
    $('#female').prop('checked', true);
    user.sex = "F";
  }
});
