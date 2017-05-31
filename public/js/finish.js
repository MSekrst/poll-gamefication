'use strict';

if (sessionStorage && sessionStorage.getItem('userID')) {
  sessionStorage.removeItem('userID');
}

const renderTable = results => {
  let tableHtml = '';

  results.forEach((result, index) => {
    tableHtml += '<tr>';

    tableHtml += `<td>${index + 1}.</td><td>${result.user.age}</td><td>${result.user.sex === 'M' ? 'Muški' : 'Ženski'}</td><td>${result.timeInGame}s</td>`;

    tableHtml += '</tr>';
  });

  $('#table-body').html(tableHtml);
};

$.get({
  url: '/anketa/results',
  success: renderTable,
});
