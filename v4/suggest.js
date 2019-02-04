var links = [''];
var xhr;
new autoComplete({
  selector: 'input[name="q"]',
  minChars: 2,
  delay: 100,
  menuClass: 'suggestDropdown',
  renderItem: function(item, search) {
    var ret = '<div class="suggestion autocomplete-suggestion" data-val="' + item['value'] + '">' + item['value'];
    if (item['affiliation']) {
      ret += ' <br>&nbsp;(' + item['affiliation'] + ')';
    }
    return ret + '</div>';
  },
  source: function(phrase, response){
    try { xhr.abort(); } catch(e){}
    xhr = $.getJSON('/cryptodb/data/jquery/query.php', { term: phrase }, function(data){
      if (data.length > 10) {
        data = data.slice(0, 10);
      }
      // Does not work in MSIE 11
      //      var matches = data.map(a => a.value);
      //      console.dir(matches);
      response(data);
    });
  }
});
