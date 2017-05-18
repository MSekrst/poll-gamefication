const collectUx = () => {
  $('#experience-modal').modal('show');
};

$('#experience-submit').on('click touchstart', e => {

  var tip = $('input[name=tip]:checked').val();
  $('#experience-modal').modal('hide');

  var url = '/saveUx/' + id;
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

