'use strict';let capable=!0;(475>screenHeight||448>screenWidth)&&(capable=!1);let isMobile=!1;/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(isMobile=!0);const polls=[],times=['ujutro','popodne','predve\u010Der','po no\u0107i'];let start=Math.floor(4*Math.random()+1),startTime,daytime,soc1,soc2,cost,image;const pollModal=$('#poll'),slider=$('#slider'),batteryRemaining=$('#battery-remaining'),coverElement=$('#cover'),pollSubmnitElement=$('#poll-submit'),firstElement=$('#first'),secondElement=$('#second'),thirdElement=$('#third'),fourthlement=$('#fourth'),fifthElement=$('#fifth'),sixthElement=$('#sixth'),batteryElement=$('#battery'),batteryTextElement=$('#battery-text');function newPoll(){if(startTime=new Date().getTime(),4===polls.length){let b=Math.floor(4*Math.random()+1);for(;b===start;)b=Math.floor(4*Math.random()+1);start=b}const a=(4-start+polls.length%4)%4+1;daytime=times[polls.length%4],soc1=Math.floor(25*Math.random()+25*(a-1)),soc2=Math.floor(Math.random()*(100-soc1-1)+soc1+1),cost=Math.floor(100*Math.random()),daytime===times[0]&&(image='carMorning'),daytime===times[1]&&(image='carDay'),daytime===times[2]&&(image='carAfternoon'),daytime===times[3]&&(image='carNight'),$('#daytime').html(daytime),$('#soc1').html(soc1),$('#soc2').html(soc2),$('#cost').html(cost),coverElement.css({'background-image':'url(/anketa/images/carDefault'+user.sex+'.png)'}),pollSubmnitElement.attr('disabled','disabled'),batteryRemaining.css('width','0'),pollModal.modal('show'),firstElement.delay(200).fadeIn(),setTimeout(()=>{if(coverElement.css({'background-image':'url(/anketa/images/'+image+user.sex+'.png)'}).animate({opacity:1},300),secondElement.delay(500).fadeIn(),thirdElement.delay(1100).fadeIn(),capable){batteryElement.delay(1100).fadeIn(800),batteryRemaining.css('background-color',33.5>soc1?'#f44336':66.5<soc1?'#4caf50':'#ffeb3b'),batteryTextElement.html(`${soc1}%`),batteryElement.delay(1100).fadeIn(800);const b=3.75*soc1;batteryRemaining.delay(2100).animate({width:b+'px'},800),fourthlement.delay(3100).fadeIn(()=>{batteryTextElement.html(`${soc1}%&nbsp;&rarr;&nbsp;${soc2}%`)});const c=3.75*soc2;batteryRemaining.delay(1e3).animate({width:c+'px'},800,()=>{batteryRemaining.css('background-color',33.5>soc2?'#f44336':66.5<soc2?'#4caf50':'#ffeb3b')}),fifthElement.delay(5100).fadeIn(),sixthElement.delay(5700).fadeIn(800)}else fourthlement.delay(1700).fadeIn(),fifthElement.delay(2300).fadeIn(),sixthElement.delay(2900).fadeIn(800)},800)}const dataSaved=()=>{window.location.href=gameFirst?`http://161.53.19.74/limesurvey/index.php/147397?lang=hr&userID=${id}&BQ=1`:`http://161.53.19.74/limesurvey/index.php/147397?lang=en&userID=${id}&BQ=0`};pollSubmnitElement.click(a=>{const b=slider.val();let c=new Date().getTime()-startTime;timeGame+=c,c/=1e3;const d={daytime,soc1,soc2,cost,wtp:b,time:c};if(polls.push(d),8===polls.length){timeGame=new Date().getTime()-timeGame,timeGame/=1e3;const f='/anketa/save/polls/'+id;$.ajax({method:'POST',url:f,data:JSON.stringify({polls:polls,timeInGame:timeGame,gameFirst,isMobile}),contentType:'application/json',success:dataSaved})}a.target.blur(),slider.val(0),sliderValue.html('0'),firstElement.hide(),secondElement.hide(),thirdElement.hide(),batteryElement.hide(),fourthlement.hide(),fifthElement.hide(),sixthElement.hide(),pollModal.modal('hide'),gameArea.restart()});const sliderValue=$('#slider-num b'),handleSliderChange=a=>{sliderValue.html(a.target.value),pollSubmnitElement.removeAttr('disabled')};slider.on('input',handleSliderChange);
