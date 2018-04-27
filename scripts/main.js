$(document).ready(function() {
  // get year in jQuery
  const currYear = (new Date).getFullYear();
  $("footer").text("\u00A9 IACR " + currYear);
});

// get year in vanilla JS
// const currDate = new Date();
// const currYear = currDate.getFullYear();
// console.log(currYear);
