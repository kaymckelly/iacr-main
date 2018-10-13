var links = [''];
var xhr;
new autoComplete({
  selector: 'input[name="q"]',
  minChars: 2,
  delay: 150,
  menuClass: 'suggestDropdown',
  renderItem: function(item, search) {
    var ret = '<div class="suggestion autocomplete-suggestion" data-val="' + item['title'] + '">' + item['title'];
    if (item['affiliation']) {
      ret += ' <br><span class="subtitle">' + item['affiliation'] + '</span>';
    } else if (item['location']) {
      ret += ' <br><span class="subtitle">' + item['location'] + '</span>';
    } else if (item['authors']) {
      ret += ' <br><span class="subtitle">' + item['authors'].join(', ') + '</span>';
    } else if (item['doctype'] == 'eprint') {
      ret += ' <br><span class="subtitle">eprint:' + item['name'] + '</span>';
    } else if (item['doctype'] == 'iacrpub') {
      ret += ' <br><span class="subtitle">' + item['venue'].toUpperCase() + ' ' + item['year'] + '</span>';
    }
    return ret + '</div>';
  },
  source: function(phrase, response){
    try { xhr.abort(); } catch(e){}
    xhr = $.getJSON('/ac', { q: phrase }, function(data){
      console.dir(data);
      if (data.length > 10) {
        data = data.slice(0, 10);
      }
      // Does not work in MSIE 11
      //      var matches = data.map(a => a.value);
      //      console.dir(matches);
      response(data.results);
    });
  }
});
