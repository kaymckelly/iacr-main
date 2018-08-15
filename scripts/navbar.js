$(document).ready(function() {
  // hide input to begin with
  $('#navSearch').hide();

  // show input when navSearchBtn is clicked
  // TODO: doesn't stay open once clicked
  if ($('#navSearchBtn').click(function() {
    $('#navSearch').show();
  }));
});

// // from https://bootsnipp.com/snippets/featured/even-simpler-navbar-search
//
//   // function closeSearch() {
//   //   var $form = $('.navbar-collapse form[role="search"].active')
//   //   $form.find('input').val('');
//   //   $form.removeClass('active');
//   // }
//
//   // Show Search if form is not active  event.preventDefault() is important, this prevents the form from submitting
//   $(document).on('click', '.navbar-collapse form[role="search"]:not(.active) button[type="submit"]', function(event) {
//     event.preventDefault();
//     var $form = $(this).closest('form'),
//       $input = $form.find('input');
//     $form.addClass('active');
//     $input.focus();
//   });
//   // ONLY FOR DEMO  Please use $('form').submit(function(event)) to track from submission
//   // if your form is ajax remember to call `closeSearch()` to close the search container
//   $(document).on('click', '.navbar-collapse form[role="search"].active button[type="submit"]', function(event) {
//     event.preventDefault();
//     var $form = $(this).closest('form'),
//       $input = $form.find('input');
//     $('#showSearchTerm').text($input.val());
//     closeSearch()
//   });
