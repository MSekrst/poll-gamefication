'use strict';

const polls = [];
const times = ['ujutro', 'popodne', 'predvečer', 'po noći'];
const start = Math.floor((Math.random() * 4) + 1);

let startTime;
let daytime;
let soc1;
let soc2;
let cost;

let image;

const pollModal = $('#poll');
const slider = $('#slider');
const batteryRemaining = $('#battery-remaining');
const coverElement = $('#cover');
const pollSubmnitElement = $('#poll-submit');
const firstElement = $('#first');
const secondElement = $('#second');
const thirdElement = $('#third');
const fourthlement = $('#fourth');
const fifthElement = $('#fifth');
const sixthElement = $('#sixth');
const batteryElement = $('#battery');
const batteryTextElement = $('#battery-text');

function newPoll() {
  startTime = (new Date()).getTime();

  const n = (4 - start + polls.length) % 4 + 1;
  daytime = times[polls.length];
  soc1 = Math.floor((Math.random() * 25) + 25 * (n - 1));
  soc2 = Math.floor((Math.random() * (100 - soc1)) + soc1);
  cost = Math.floor((Math.random() * 100));

  if (daytime === times[0]) {
    image = 'carMorning';
  }
  if (daytime === times[1]) {
    image = 'carDay';
  }
  if (daytime === times[2]) {
    image = 'carAfternoon';
  }
  if (daytime === times[3]) {
    image = 'carNight';
  }

  $('#daytime').html(daytime);
  $('#soc1').html(soc1);
  $('#soc2').html(soc2);
  $('#cost').html(cost);

  coverElement.css({'background-image': 'url(../images/carDefault' + user.sex + '.png)'});
  pollSubmnitElement.attr('disabled', 'disabled');
  batteryRemaining.css('background-color', 'yellow');
  batteryRemaining.css('width', '0');

  pollModal.modal('show');

  firstElement.delay(200).fadeIn();

  // weird way to make async
  setTimeout(() => {
    coverElement.css({'background-image': 'url(../images/' + image + user.sex + '.png)'}).animate({opacity: 1}, 300);
    secondElement.delay(500).fadeIn();
    thirdElement.delay(1100).fadeIn();

    batteryElement.delay(1100).fadeIn(800);
    const width = 3.75 * soc1;

    batteryRemaining.css('background-color',  soc1 < 33.5 ? '#f44336' : (soc1 > 66.5 ? '#4caf50' : '#ffeb3b'));
    batteryTextElement.html(`${soc1}%`);

    batteryRemaining.delay(2100).animate({width: width + 'px'}, 800);

    fourthlement.delay(3100).fadeIn(() => {
      batteryTextElement.html(`${soc1}%&nbsp;&rarr;&nbsp;${soc2}%`);
    });
    const width2 = 3.75 * soc2;
    batteryRemaining.delay(1000).animate({width: width2 + 'px' }, 800,  () => {
      batteryRemaining.css('background-color', soc2 < 33.5 ? '#f44336' : (soc2 > 66.5 ? '#4caf50' : '#ffeb3b'));
    });

    fifthElement.delay(5100).fadeIn();
    sixthElement.delay(5700).fadeIn(800);
  }, 800);
}

const dataSaved = () => {
  collectUx();
};

pollSubmnitElement.click(e => {
  const wtp = slider.val();
  let time = (new Date()).getTime() - startTime;
  timeGame += time;
  time = time /1000;
  const poll = { daytime, soc1, soc2, cost, wtp, time };

  polls.push(poll);

  if (polls.length === 4) {
    timeGame = (new Date()).getTime() - timeGame;
    timeGame = timeGame/1000;
    const url = '/save/polls/' + id;

    $.ajax({
      method: 'POST',
      url: url,
      data: JSON.stringify({ polls: polls, timeInGame: timeGame }),
      contentType: 'application/json',
      success: dataSaved
    });
  }

  e.target.blur();

  slider.val(0);
  sliderValue.html('0');

  firstElement.hide();
  secondElement.hide();
  thirdElement.hide();
  batteryElement.hide();
  fourthlement.hide();
  fifthElement.hide();
  sixthElement.hide();
  pollModal.modal('hide');

  // set sampling interval
  gameArea.restart();
});

const sliderValue = $('#slider-num b');

const handleSliderChange = e => {
  sliderValue.html(e.target.value);
  pollSubmnitElement.removeAttr('disabled');
};

slider.on('input', handleSliderChange);
