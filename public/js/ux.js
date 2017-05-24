const collectUx = () => {
  $('#experience-modal').modal('show');
};

const dataSaved2 = () => {
  console.log('Data saved successfully');
  window.location.href = "/finish";
};

$('#experience-submit').on('click touchstart', e => {

  const tip = $('input[name=tip]:checked').val();

  const experience = [];

  for(var i = 1; i<= 15; i++) {
      let object = {
        question:  $('#question' + i).text(),
        answer: $('input[name=question'+ i+']:checked').val()
      }
      experience.push(object);
  }
  $('#experience-modal').modal('hide');

  const url = '/save/ux/' + id;
  console.log(experience);
  $.ajax({
    method: 'POST',
    url: url,
    data: JSON.stringify({experience: experience }),
    contentType: 'application/json',
    success: dataSaved2()
  });


});

