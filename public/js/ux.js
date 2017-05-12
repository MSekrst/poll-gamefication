const dataSaved = () => {
  console.log('data saved');
};

const collectUx = () => {
  $.ajax({
    method: 'POST',
    url: '/save',
    data: JSON.stringify({ polls, user: {}, experience: {} }),
    contentType: 'application/json',
    success: dataSaved,
  });
};
