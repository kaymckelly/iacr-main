
function isMobile() {
  return $('#iacrLogo').is(':hidden');
}

$('#searchInput2').focus(function() {
  if (isMobile()) return;
  $('#menuContainer').hide();
  $('#searchboxContainer').removeClass('w-25').addClass('w-100');
});
$('#searchInput2').blur(function() {
  if (isMobile()) return;
  $('#menuContainer').show();
  $('#searchboxContainer').removeClass('w-100').addClass('w-25');
});
                        
  
