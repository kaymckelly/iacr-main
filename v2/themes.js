// Keep track of which one we had previously set.
var current_theme = 'default';
// In order to change from "blue" to "green" we first
// remove the class "toprow-blue" and insert the class
// toprow-green. We know which one to remove because we
// keep track of current_theme as the selected theme, and
// update it at the end of the change.

function setTheme(new_theme) {
  console.dir('set theme from ' + current_theme + ' to ' + new_theme);
  var body = document.getElementsByTagName('body')[0];
  body.classList.remove(current_theme + '-body');
  body.classList.add(new_theme + '-body');

  document.getElementById('menubar').classList.remove(current_theme + '-menubar');
  document.getElementById('menubar').classList.add(new_theme + '-menubar');

  var headers = document.querySelectorAll('.' + current_theme + '-card-header');
  for (i = 0; i < headers.length; ++i) {
    headers[i].classList.remove(current_theme + '-card-header');
    headers[i].classList.add(new_theme + '-card-header');
  }

  var footers = document.querySelectorAll('.' + current_theme + '-card-footer');
  for (i = 0; i < footers.length; ++i) {
    footers[i].classList.remove(current_theme + '-card-footer');
    footers[i].classList.add(new_theme + '-card-footer');
  }

  var pageFooters = document.querySelectorAll('footer');
  for (i = 0; i < pageFooters.length; i++) {
    pageFooters[i].classList.remove(current_theme + '-footer');
    pageFooters[i].classList.add(new_theme + '-footer');
  }
  var navLinks = document.querySelectorAll('.nav-link');
  for (i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove(current_theme + '-nav-link');
    navLinks[i].classList.add(new_theme + '-nav-link');
  }
//  document.getElementById('footer').classList.remove(current_theme + '-footer');
//  document.getElementById('footer').classList.add(new_theme + '-footer');

  document.getElementById('topbar').classList.remove(current_theme + '-topbar');
  document.getElementById('topbar').classList.add(new_theme + '-topbar');

  document.getElementById('searchDropdown').classList.remove(current_theme + '-search');
  document.getElementById('searchDropdown').classList.add(new_theme + '-search');

  var footerHeaders = document.querySelectorAll('.' + current_theme + '-footerLinkList');
  for (i = 0; i < footerHeaders.length; ++i) {
    footerHeaders[i].classList.remove(current_theme + '-footerLinkList');
    footerHeaders[i].classList.add(new_theme + '-footerLinkList');
  }

  // only needed for v3 footer
  var footerTitles = document.querySelectorAll('.' + current_theme + '-footerTitle');
  for (i = 0; i < footerTitles.length; ++i) {
    footerTitles[i].classList.remove(current_theme + '-footerTitle');
    footerTitles[i].classList.add(new_theme + '-footerTitle');
  }

  var bottomFooter = document.querySelectorAll('.' + current_theme + '-bottomOfFooter');
  for (i = 0; i < bottomFooter.length; ++i) {
    bottomFooter[i].classList.remove(current_theme + '-bottomOfFooter');
    bottomFooter[i].classList.add(new_theme + '-bottomOfFooter');
  }

  current_theme = new_theme;
}
var footer = 'v1';
function setFooter(val) {
  $('#' + footer).hide();
  $('#' + val).show();
  footer = val;
  return false;
}
