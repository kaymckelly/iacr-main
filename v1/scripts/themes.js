// Keep track of which one we had previously set.
var current_theme = 'default';

// The page loads with body class="default-body". You change the theme by removing default-body and changing to green-body (for whichever themes you set up in themes.css).
function setTheme(new_theme) {
  // body (whole page things)
  var body = document.getElementById('fullpage');
  body.classList.remove(current_theme + '-body');
  body.classList.add(new_theme + '-body');

  // top header (above nav)
  document.getElementById('topEnclosure').classList.remove(current_theme + '-header');
  document.getElementById('topEnclosure').classList.add(new_theme + '-header');

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

  // individual conference cards
  var confHeadings = document.querySelectorAll('.' + current_theme + '-conferenceHeader');
  var eventInfos = document.querySelectorAll('.' + current_theme + '-eventInfo');
  for (var i = 0; i < confHeadings.length; i++) {
    confHeadings[i].classList.remove(current_theme + '-conferenceHeader');
    confHeadings[i].classList.add(new_theme + '-conferenceHeader');
  }
  for (var i = 0; i < eventInfos.length; i++) {
    eventInfos[i].classList.remove(current_theme + '-eventInfo');
    eventInfos[i].classList.add(new_theme + '-eventInfo');
  }

  // anchors not in a nav, footer, or other structure where their color is specially defined
   var anchors = document.querySelectorAll('.' + current_theme + '-anchor');
   for (var i = 0; i < anchors.length; i++) {
     anchors[i].classList.remove(current_theme + '-anchor');
     anchors[i].classList.add(new_theme + '-anchor');
   }

  // captions for events
  var figCaptions = document.querySelectorAll('.' + current_theme + '-figCaption');
  for (var i = 0; i < figCaptions.length; i++) {
    figCaptions[i].classList.remove(current_theme + '-figCaption');
    figCaptions[i].classList.add(new_theme + '-figCaption');
  }

  // footer
  document.getElementById('pageFooter').classList.remove(current_theme + '-footer')
  document.getElementById('pageFooter').classList.add(new_theme + '-footer');

  // footer titles
  var footerTitles = document.querySelectorAll('.' + current_theme + '-footerTitle');
  for (var i = 0; i < footerTitles.length; i++) {
    footerTitles[i].classList.remove(current_theme + '-footerTitle');
    footerTitles[i].classList.add(new_theme + '-footerTitle');
  }

  // footer links
  var footerLinks = document.querySelectorAll('.' + current_theme + '-footerLink');
  for (var i = 0; i < footerLinks.length; i++) {
    footerLinks[i].classList.remove(current_theme + '-footerLink');
    footerLinks[i].classList.add(new_theme + '-footerLink');
  }

  current_theme = new_theme;
}
