'use strict';

const polls = [];
const times = ['7:00', '12:00', '17:00', '21:00', '3:00'];
const start = Math.floor((Math.random() * 5) + 1);

let startTime;
let daytime;
let soc1;
let soc2;
let cost;

const pollDiv = $('#poll');
const pollContent = $('#poll-content');
const background = $('#background');

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

    background.show();
    pollDiv.slideDown(700);
    pollContent.delay(500).fadeIn();
}

const dataSaved = () => {
    console.log('Data saved successfully')

    collectUx();
};

$('#poll-submit').click(e => {
    const wtp = 124;
    const time = (new Date().getMilliseconds() - startTime) / 1000;

    const poll = {daytime, soc1, soc2, cost, wtp, time};

    polls.push(poll);
    var url = '/savePolls/' + id;
    if (polls.length === 5) {
        $.ajax({
            method: 'POST',
            url: url,
            data: JSON.stringify({polls: polls}),
            contentType: 'application/json',
            success: dataSaved
        });
    }

    e.target.blur();

  if (polls.length === 5) {
    collectUx();
  }

    background.hide();
    pollContent.fadeOut();
    pollDiv.delay(200).slideUp();

});
