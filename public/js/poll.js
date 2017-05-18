'use strict';

const polls = [];
const times = ['7:00', '12:00', '17:00', '21:00', '3:00'];
const start = Math.floor((Math.random() * 5) + 1);

let startTime;
let daytime;
let soc1;
let soc2;
let cost;

const pollModal = $('#poll');
const slider = $('#slider');

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
    console.log('Data saved successfully');

    collectUx();
};

$('#poll-submit').click(e => {
    const wtp = slider.val();
    const time = (new Date().getMilliseconds() - startTime) / 1000;

    const poll = {daytime, soc1, soc2, cost, wtp, time};

    polls.push(poll);

    if (polls.length === 5) {
      const url = '/savePolls/' + id;

      $.ajax({
        method: 'POST',
        url: url,
        data: JSON.stringify({ polls: polls }),
        contentType: 'application/json',
        success: dataSaved
      });
    }

    e.target.blur();

  if (polls.length === 5) {
    collectUx();
  }

  slider.val(0);
  sliderValue.html('0');

  pollModal.modal('hide');
});

const sliderValue = $('#slider-num b');

const handleSliderChange = e => {
  sliderValue.html(e.target.value)
};


slider.on('input', handleSliderChange);
