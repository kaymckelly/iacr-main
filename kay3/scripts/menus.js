$(document).ready(function() {
  // get screen size (using window rather than document as the document can extend past the confines of the window), also nav item
  const size = $(window).width();
  const navItem = $("li.nav-item");

  // i.e. if navmenu isn't collapsed to hamburger
  if (size >= 992) {
    // use hover not mouseover so can set behavior for both cursor in and cursor out
    $(navItem).hover(
      function() {
        $(this).append($("<span> ***</span>"));
      },
      function() {
        $(this).find("span:last").remove();
      }
    );
  }
});
