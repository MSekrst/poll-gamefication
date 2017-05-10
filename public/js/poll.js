'use strict';

const polls = [];
const times = ['7:00', '12:00', '17:00', '21:00', '3:00'];
const start = Math.floor((Math.random() * 5) + 1);

let startTime;
let daytime;
let soc1;
let soc2;
let cost;

const pollModal = $('#poll-modal');

function newPoll() {
  startTime = new Date().getMilliseconds();

  const n = (5 - start + polls.length) % 5 + 1;
  daytime = times[polls.length];
  soc1 = Math.floor((Math.random() * 20) + 20 * (n - 1));
  soc2 = Math.floor((Math.random() * (100 - soc1)) + soc1);
  cost = Math.floor((Math.random() * 100));

  $('#daytime').html(daytime);
  $('#soc1').html(soc1);
  $('#soc2').html(soc2);
  $('#cost').html(cost);

  pollModal.modal('show');
}

const dataSaved = () => {
  console.log('Data saved successfully')

  collectUx();
};

$('#poll-submit').click(e => {
  const wtp = 124;
  const time = (new Date().getMilliseconds() - startTime) / 1000;

  const poll = { daytime, soc1, soc2, cost, wtp, time };

  polls.push(poll);

  if (polls.length === 5) {
    $.ajax({
      method: 'POST',
      url: '/save',
      data: JSON.stringify({ polls, user: {}, experience: {} }),
      contentType: 'application/json',
      success: dataSaved,
    });
  }

  e.target.blur();

  pollModal.modal('hide');
});

//function post(path, params, method) {
//  method = method || 'post'; // Set method to post by default if not specified.
//
//  // The rest of this code assumes you are not using a library.
//  // It can be made less wordy if you use one.
//  var form = document.createElement('form');
//  form.setAttribute('method', method);
//  form.setAttribute('action', path);
//
//  for (const key in params) {
//    if (params.hasOwnProperty(key)) {
//      const hiddenField = document.createElement('input');
//      hiddenField.setAttribute('type', 'hidden');
//      hiddenField.setAttribute('name', key);
//      hiddenField.setAttribute('value', params[key]);
//
//      form.appendChild(hiddenField);
//    }
//  }
//
//  document.body.appendChild(form);
//  form.submit();
//}
