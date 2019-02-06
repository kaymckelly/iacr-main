/* This is to make sure that the menu collapses if you click on 
   the search button. It already appears that the search dropdown
   will collapse if you touch the menu toggler.
*/
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
