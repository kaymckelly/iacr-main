
function isMobile() {
  return $('#iacrLogo').is(':hidden');
}

$('#searchbox').focus(function() {
  if (isMobile()) return;
  $('#menuContainer').hide();
  $('#searchboxContainer').removeClass('w-25').addClass('w-100');
  $('#searchInstructions').show();
});
$('#searchbox').blur(function() {
  if (isMobile()) return;
  $('#menuContainer').show();
  $('#searchboxContainer').removeClass('w-100').addClass('w-25');
  $('#searchInstructions').hide();
});
                        
  
