'use strict';

const userModal = $('#user-modal');
const user = {};

userModal.modal('show');

$('#user-submit').on('click touchstart', e => {
  startGame();

  e.target.blur();

  userModal.modal('hide');
});
