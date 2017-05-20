const collectUx = () => {
  $('#experience-modal').modal('show');
};

const dataSaved2 = () => {
  console.log('Data saved successfully');
};

$('#experience-submit').on('click touchstart', e => {

  const tip = $('input[name=tip]:checked').val();
  $('#experience-modal').modal('hide');

  const url = '/save/ux/' + id;
  const experience = {tip};

  console.log(experience);
  $.ajax({
    method: 'POST',
    url: url,
    data: JSON.stringify({experience: experience }),
    contentType: 'application/json',
    success: dataSaved2()
  });

  window.location.href = "/finish";
});

