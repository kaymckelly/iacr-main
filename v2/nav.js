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

$('#searchbox2').focus(function() {
  if (isMobile()) {
    $('#searchbox2').scrollView();
    return;
  }
  $('#menuContainer').hide();
  $('#searchboxContainer').removeClass('w-25').addClass('w-100');
  $('#searchInstructions').show();
});
$('#searchbox2').blur(function() {
  if (isMobile()) return;
  $('#menuContainer').show();
  $('#searchboxContainer').removeClass('w-100').addClass('w-25');
  $('#searchInstructions').hide();
});
                        
  
$('#searchbox').focus(function() {
  if (isMobile()) {
    $('#searchDropdown').scrollView();
  }
});
