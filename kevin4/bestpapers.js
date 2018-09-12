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

get_data('/cryptodb/data/bestpaper.php', function(data) {
  var html = '';
  for (i = 0; i < Math.min(4, data.length); i++) {
    var row = data[i];
    html += '<p>' + row['award'] + ', ' + capitalize(row['venue']) + ' ' + row['year'];
    html += ', <a href="/cryptodb/data/paper.php?pubkey=' + row['pubkey'] + '">';
    html += row['title'] + '</a></p>';
  }
  document.getElementById("best_papers").innerHTML = html;
});
/*
get_data('/cryptodb/data/bestpaper.php', function(data) {
  var html = '<ul>';
  for (i = 0; i < Math.min(4, data.length); i++) {
    var row = data[i];
    console.dir(row);
    html += '<li>' + row['award'] + ', ' + capitalize(row['venue']) + ' ' + row['year'];
    html += ', <a href="/cryptodb/data/paper.php?pubkey=' + row['pubkey'] + '">';
    html += row['title'] + '</a></li>';
  }
  document.getElementById("best_papers").innerHTML = html;
});
*/
