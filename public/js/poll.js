'use strict';

const polls = [];
const times = ['ujutro', 'popodne', 'predvečer', 'po noći'];
const start = Math.floor((Math.random() * 4) + 1);

let startTime;
let daytime;
let soc1;
let soc2;
let cost;

const pollModal = $('#poll');
const slider = $('#slider');
const batteryRemaining = $('#battery-remaining');

let image;
function newPoll() {
    startTime = new Date();

    const n = (4 - start + polls.length) % 4 + 1;
    daytime = times[polls.length];
    soc1 = Math.floor((Math.random() * 25) + 25 * (n - 1));
    soc2 = Math.floor((Math.random() * (100 - soc1)) + soc1);
    cost = Math.floor((Math.random() * 100));

    if (daytime == times[0]) {
        image = 'carMorning';
    }
    if (daytime == times[1]) {
        image = 'carDay';
    }
    if (daytime == times[2]) {
        image = 'carAfternoon';
    }
    if (daytime == times[3]) {
        image = 'carNight';
    }

    $('#daytime').html(daytime);
    $('#soc1').html(soc1);
    $('#soc2').html(soc2);
    $('#cost').html(cost);

    $('#cover').css({'background-image': 'url(../images/carDefault' + user.sex + '.png)'});

    $('#poll-submit').attr('disabled','disabled');

    pollModal.modal('show');

    $('#first').delay(200).fadeIn();

    $('#cover').delay(800).animate({opacity: 0.8}, 500, function () {
        $('#cover').css({'background-image': 'url(../images/'+ image + user.sex + '.png)'}).animate({opacity: 1}, 100);
        $('#second').delay(500).fadeIn();
        $('#third').delay(2000).fadeIn();

        $('#battery').delay(2000).fadeIn(500);
        const width = 375 / 100 * soc1;

        batteryRemaining.attr('style', `width: ${width}px`);

        $('#fourth').delay(4000).fadeIn();

        $('#fifth').delay(6000).fadeIn();

        $('#sixth').delay(7500).fadeIn();
    });
}

const dataSaved = () => {
    console.log('Data saved successfully');

    collectUx();
};

$('#poll-submit').click(e => {
    const wtp = slider.val();
    const time = (new Date() - startTime)/1000  ;
    timeGame -= time;
    const poll = {daytime, soc1, soc2, cost, wtp, time};

    polls.push(poll);

    if (polls.length === 4) {
        timeGame -=  new Date()/1000;
        console.log(timeGame);
        const url = '/save/polls/' + id;

        $.ajax({
            method: 'POST',
            url: url,
            data: JSON.stringify({polls: polls, timeInGame: timeGame}),
            contentType: 'application/json',
            success: dataSaved
        });
    }

    e.target.blur();

    if (polls.length === 4) {
      collectUx();
    }
   slider.val(0);
    sliderValue.html('0');

    $('#first').hide();
    $('#second').hide();
    $('#third').hide();
    $('#battery').hide();
    $('#fourth').hide();
    $('#fifth').hide();
    $('#sixth').hide();
    pollModal.modal('hide');

});

const sliderValue = $('#slider-num b');

const handleSliderChange = e => {
    sliderValue.html(e.target.value);
    $('#poll-submit').removeAttr('disabled');
};


slider.on('input', handleSliderChange);
