const collectUx = () => {
  $('#experience-modal').modal('show');
};

$('#experience-submit').on('click touchstart', e => {

  var tip = $('input[name=tip]:checked').val();
  $('#experience-modal').modal('hide');

  const experience = {tip};
  $.ajax({
    method: 'POST',
    url: '/save',
    data: JSON.stringify({ polls, user: {}, experience: experience }),
    contentType: 'application/json',
    success: dataSaved,
  });

  window.location.href = "/finish";
});

