'use strict';

var polls = [];
var solvedPolls = 0;
var times = ['7:00', '12:00', '17:00', '21:00', '3:00'];
var start = Math.floor((Math.random() * 5) + 1);

var startTime;
var daytime;
var soc1;
var soc2;
var cost;

function newPool() {
  startTime = new Date().getMilliseconds();

  var n = (5 - start + solvedPolls) % 5 + 1;
  daytime = times[solvedPolls];
  soc1 = Math.floor((Math.random() * 20) + 20 * (n - 1));
  soc2 = Math.floor((Math.random() * (100 - soc1)) + soc1);
  cost = Math.floor((Math.random() * 100));
  solvedPolls++;

  $('#daytime').html(daytime);
  $('#soc1').html(soc1);
  $('#soc2').html(soc2);
  $('#cost').html(cost);

}

function savePoll(wtp, time) {
  var poll = { daytime,  soc1, soc2, cost, wtp, time};
  polls.push(poll);
}

var slider = $('#slider').slider({
  ticks: [0, 75, 150, 225, 300],
  ticks_positions: [0, 25, 50, 75, 100],
  ticks_labels: ['0', '75', '150', '225', '300'],
  ticks_snap_bounds: 0,
  tooltip: 'show',
  tooltip_position: 'top',
  value: 0
});

$('#slider').attr('style', 'margin-bottom:28px; width:80%; margin-left:10%');
$('#tooltip').attr('style', 'opacity:1');
$('#poll').submit(function (e) {
  var wtp = slider.slider('getValue');
  var time = (new Date().getMilliseconds() - startTime) / 1000;

  var poll = {
    'daytime': daytime,
    'soc1': soc1,
    'soc2': soc2,
    'cost': cost,
    'wtp': wtp,
    'time': time
  };

  post('./save', poll);

  e.preventDefault();
});

function post(path, params, method) {
  method = method || 'post'; // Set method to post by default if not specified.

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  var form = document.createElement('form');
  form.setAttribute('method', method);
  form.setAttribute('action', path);

  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var hiddenField = document.createElement('input');
      hiddenField.setAttribute('type', 'hidden');
      hiddenField.setAttribute('name', key);
      hiddenField.setAttribute('value', params[key]);

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}
