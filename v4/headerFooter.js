/* This function is to make sure that the menu collapses if you click
   on the search button. It already appears that the search dropdown
   will collapse if you touch the menu toggler.
*/
function addNavAnimations() {
  $('#searchDropdownParent').on('show.bs.dropdown', function() {
    $('#navbarSupportedContent').collapse('hide');
    $('#hamburger').removeClass('active');
  });
  /* Animation for search dropdown menu. */
  $('.dropdown').on('show.bs.dropdown', function(e) {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    $('#searchbox').focus();
  });

  $('.dropdown').on('hide.bs.dropdown', function(e) {
     $(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
  });
}

$.ajax({
  url: 'header.html',
  dataType: 'html',
  cache: false,
  success: function(data) {
    $('#pageHeaderAndNav').html(data);
    addNavAnimations();
    $.getScript('search.js');
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
