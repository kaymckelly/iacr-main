// This can be moved to headerFooter.js eventually.
function isMobile() {
  return $('#iacrLogo').is(':hidden');
}

// A function to scroll to an element. This
// is used when you put the focus in search.
$.fn.scrollView = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 500);
  });
}

// When the searchbox receives focus, display
// the search instructions. If on mobile,
// then scroll to the search instructions.
// If the navbar is uncollapsed, hide the menu
// and make the searchbox full width.
$('#searchbox3').focus(function() {
  $('#searchInstructions2').removeClass('d-none');
  $('#searchInstructions2').addClass('d-block');
  if (isMobile()) {
    $('#searchInstructions2').scrollView();
    return;
  }
  $('#menuContainer').hide();
  $('#searchboxContainer').removeClass('w-25').addClass('w-100');
});

$('#searchbox3').blur(function() {
  $('#searchInstructions2').removeClass('d-block');
  $('#searchInstructions2').addClass('d-none');
  if (isMobile()) return;
  $('#menuContainer').show();
  $('#searchboxContainer').removeClass('w-100').addClass('w-25');
});
                        
  
$('#searchbox').focus(function() {
  if (isMobile()) {
    $('#searchDropdown').scrollView();
  }
});

$('#searchbox3').focus(function() {
  $('#searchInstructions3').scrollView();
});
$('span.remover').click(function() {
  $(this).parent().parent().parent().parent().remove();
});
/* toggler animation adapted from
 * https://bootsnipp.com/snippets/featured/hamburger-icon-animations */
$(document).on('click', '.navbar-toggler', function () {
  $(this.lastElementChild).toggleClass('active')
})
