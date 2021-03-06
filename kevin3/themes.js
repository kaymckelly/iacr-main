// Keep track of which one we had previously set.
var current_theme = 'default';
// We assume that for blue, there are classes on
// elements as follows:
//   body: body-blue
//   #toprow: toprow-blue
//   #menu: menu-blue
//   .card-header: cardheader-blue
// In order to change from "blue" to "green" we first
// remove the class "toprow-blue" and insert the class
// toprow-green. We know which one to remove because we
// keep track of existing_index as the selected theme.
  
function changeBackground() {
  document.getElementById('body').classList.remove(themes[bgindex]);
  bgindex = (bgindex + 1) % 5;
  document.getElementById('body').classList.add(themes[bgindex]);
  document.getElementById('theme').textContent = "Theme: " + themes[bgindex];
}

function setTheme(new_theme) {
  console.dir('set theme from ' + current_theme + ' to ' + new_theme);
  var body = document.getElementsByTagName('body')[0];
  body.classList.remove(current_theme + '-body');
  body.classList.add(new_theme + '-body');
  var headers = document.querySelectorAll('.' + current_theme + '-card-header');
  for (i = 0; i < headers.length; ++i) {
    headers[i].classList.remove(current_theme + '-card-header');
    headers[i].classList.add(new_theme + '-card-header');
  }
  document.getElementById('acronym').classList.remove(current_theme + '-name');
  document.getElementById('acronym').classList.add(new_theme + '-name');
  document.getElementById('iacrname').classList.remove(current_theme + '-name');
  document.getElementById('iacrname').classList.add(new_theme + '-name');
  var footers = document.querySelectorAll('.' + current_theme + '-card-footer');
  for (i = 0; i < footers.length; ++i) {
    footers[i].classList.remove(current_theme + '-card-footer');
    footers[i].classList.add(new_theme + '-card-footer');
  }
  document.getElementById('topbar').classList.remove(current_theme + '-topbar');
  document.getElementById('topbar').classList.add(new_theme + '-topbar');
  current_theme = new_theme;
}
