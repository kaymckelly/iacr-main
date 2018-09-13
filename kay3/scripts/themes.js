// Keep track of which one we had previously set.
var current_theme = 'default';

// The page loads with body class="default-body". You change the theme by removing default-body and changing to green-body (for whichever themes you set up in themes.css).
function setTheme(new_theme) {
  var body = document.getElementsByTagName('body')[0];
  body.classList.remove(current_theme + '-body');
  body.classList.add(new_theme + '-body');

  document.getElementById('menubar').classList.remove(current_theme + '-menubar');
  document.getElementById('menubar').classList.add(new_theme + '-menubar');

  var dropdowns = document.querySelectorAll('.' + current_theme + '-dropdown');
  for (var i = 0; i < dropdowns.length; i++) {
    dropdowns[i].classList.remove(current_theme + '-dropdown');
    dropdowns[i].classList.add(new_theme + '-dropdown');
  }

  document.getElementById('main').classList.remove(current_theme + '-main');
  document.getElementById('main').classList.add(new_theme + '-main');

  // var headers = document.querySelectorAll('.' + current_theme + '-card-header');
  // for (i = 0; i < headers.length; ++i) {
  //   headers[i].classList.remove(current_theme + '-card-header');
  //   headers[i].classList.add(new_theme + '-card-header');
  // }

  document.getElementById('topbar').classList.remove(current_theme + '-topbar');
  document.getElementById('topbar').classList.add(new_theme + '-topbar');

  current_theme = new_theme;
}
