'use strict';

const userModal = $('#user-modal');

const user = {};

$('#user-submit').on('click touchstart', e => {
  startGame();

  e.target.blur();

  userModal.modal('hide');
});

userModal.modal('show');
