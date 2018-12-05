$.ajax({
  url: 'header.html',
  dataType: 'html',
  cache: false,
  success: function(data) {
    $('#pageHeader').html(data);
  },
  error: function(jqXHR, textStatus, errorThrow) {
    console.log(textStatus);
    console.dir(jqXHR);
  }
});

$.ajax({
  url: 'footer.html',
  dataType: 'html',
  cache: false,
  success: function(data) {
    $('#pageFooter').html(data);
    $('#currentYear').text(new Date().getFullYear());
  }
});
