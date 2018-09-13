function get_data(url, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       try {
         var data = JSON.parse(xhttp.responseText);
       } catch (err) {
         console.log(err.message + ' in ajax call');
         return;
       }
       callback(data);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
      
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}

get_data('/cryptodb/data/bestpaper.php?a=1', function(data) {
  var html = '';
  for (i = 0; i < Math.min(4, data.length); i++) {
    var row = data[i];
    html += '<p>' + row['award'] + ', ' + capitalize(row['venue']) + ' ' + row['year'];
    html += ', <a href="/cryptodb/data/paper.php?pubkey=' + row['pubkey'] + '">';
    html += row['title'] + '</a></p>';
  }
  document.getElementById("best_papers").innerHTML = html;
});

/* I tried this for accordion, but I didn't like it.
   The abstracts are typically too big.
get_data('/cryptodb/data/bestpaper.php?a=1', function(data) {
  var html = '<ul>';
  var template = '<div class="card"><div class="card-header" id="bestheading-_PUBKEY_">' +
                 '<h5 class="mb-0">' +
                 '<button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#bestpaper-_PUBKEY_" aria-expanded="false" aria-controls="bestpaper-_PUBKEY_">' +
                 '_AWARD_, _VENUE_ _YEAR_, _TITLE_</button></h5></div>' +
        '<div id="bestpaper-_PUBKEY_" class="collapse show" aria-labelledby="bestheading-_PUBKEY_" data-parent="#best_papers">' +
      '<div class="card-body">_ABSTRACT_<br><a href="/cryptodb/data/paper.php?pubkey=_PUBKEY_">Full paper</a>' +
      '</div></div></div>';
  for (i = 0; i < Math.min(4, data.length); i++) {
    var row = data[i];
    console.dir(row);
    var item = template.replace(/_PUBKEY_/g, row['pubkey']).replace(/_AWARD_/g, row['award']).replace(/_VENUE_/g, row['venue']).replace(/_YEAR_/g, row['year']);
    item = item.replace(/_TITLE_/g, row['title']).replace(/_ABSTRACT_/g, row['abstract'] ? 'Abstract: ' + row['abstract'] : '');
    html += item;
  }
  document.getElementById("best_papers").innerHTML = html;
});*/
