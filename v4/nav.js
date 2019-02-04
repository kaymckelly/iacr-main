/* toggler animation adapted from
 * https://bootsnipp.com/snippets/featured/hamburger-icon-animations */
$(document).on('click', '.navbar-toggler', function () {
  $(this.lastElementChild).toggleClass('active')
})
