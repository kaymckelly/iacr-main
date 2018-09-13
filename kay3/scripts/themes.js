// Keep track of which one we had previously set.
var current_theme = 'default';

// The page loads with body class="default-body". You change the theme by removing default-body and changing to green-body (for whichever themes you set up in themes.css).
function setTheme(new_theme) {
  // body (whole page things)
  var body = document.getElementsByTagName('body')[0];
  body.classList.remove(current_theme + '-body');
  body.classList.add(new_theme + '-body');

  // nav
  document.getElementById('menubar').classList.remove(current_theme + '-menubar');
  document.getElementById('menubar').classList.add(new_theme + '-menubar');

  // dropdowns on nav
  var dropdowns = document.querySelectorAll('.' + current_theme + '-dropdown');
  for (var i = 0; i < dropdowns.length; i++) {
    dropdowns[i].classList.remove(current_theme + '-dropdown');
    dropdowns[i].classList.add(new_theme + '-dropdown');
  }

  // card headings
  var cardHeadings = document.querySelectorAll('.' + current_theme + '-cardHeading');
  for (var i = 0; i < cardHeadings.length; i++) {
    cardHeadings[i].classList.remove(current_theme + '-cardHeading');
    cardHeadings[i].classList.add(new_theme + '-cardHeading');
  }

  // captions for events
  var figCaptions = document.querySelectorAll('.' + current_theme + '-figCaption');
  for (var i = 0; i < figCaptions.length; i++) {
    figCaptions[i].classList.remove(current_theme + '-figCaption');
    figCaptions[i].classList.add(new_theme + '-figCaption');
  }

  current_theme = new_theme;
}
