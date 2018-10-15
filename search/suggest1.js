var links = [''];
var xhr;
new autoComplete({
  selector: 'input[id="q1"]',
  minChars: 2,
  menuClass: 'suggestDropdown',
  renderItem: function(item, search) {
    var ret = '<div class="autocomplete-suggestion suggestion" data-val="' + item['title'] + '"><span class="suggestion-title">' + item['title'] + '</span>';
    var authors = null;
    if (item['authors']) {
      authors = item['authors'].join(', ');
    }
    if (item['affiliation']) {
      ret += ' <br><span class="subtitle">' + item['affiliation'] + '</span>';
    } else if (item['location']) {
      ret += ' <br><span class="subtitle">' + item['location'] + '</span>';
    } else if (item['doctype'] == 'eprint') {
      ret += ' <br><span class="subtitle">Eprint: ' + item['name'];
      if (authors) {
        ret += ', ' + authors;
      }
      ret += '</span>';
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
