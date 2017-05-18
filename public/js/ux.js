const collectUx = () => {
  $('#experience-modal').modal('show');
};

$('#experience-submit').on('click touchstart', e => {

  const tip = $('input[name=tip]:checked').val();
  $('#experience-modal').modal('hide');

  const url = '/save/ux/' + id;
  const experience = {tip};
  $.ajax({
    method: 'POST',
    url: url,
    data: JSON.stringify({experience: experience }),
    contentType: 'application/json',
    success: dataSaved,
  });

  window.location.href = "/finish";
});

