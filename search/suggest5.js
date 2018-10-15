var TITLE_TEMPLATE = '<div class="autocomplete-suggestion suggestion5" ' +
    'data-url="_URL_" data-val="_QUERY_">' +
    '<span class="suggestion-title5">_TITLE_</span>';
var SUBTITLE_TEMPLATE = '<br><span class="subtitle5">_SUBTITLE_</span></div>';
var links = [''];

// in document.ready, do this:
new autoComplete({
  selector: 'input[name="q"]',
  minChars: 2,
  menuClass: 'suggestDropdown',
  onSelect: function(event, term, item) {
    window.location = item.getAttribute('data-url');
  },
  renderItem: function(item, search) {
    var ret = '<div class="autocomplete-suggestion suggestion5" data-url="' + item['url'] + '" data-val="' + search + '"><span class="suggestion-title5">' + item['title'] + '</span>';
    var authors = null;
    if (item['authors']) {
      authors = item['authors'].join(', ');
    }
    var subtitle = null;
    switch(item['doctype']) {
    case 'news':
      subtitle = 'News: ' + item['channel'];
      if (item['subheadline']) {
        subtitle += ': ' + item['subheadline'];
      }
      break;
    case 'iacrpub':
      subtitle = item['venue'].toUpperCase() + ' ' + item['year'];
      if (authors) {
        subtitle += ', ' + authors;
      }
      break;
    case 'eprint':
      subtitle = 'Eprint: ' + item['name'];
      if (authors) {
        subtitle += ', ' + authors;
      }
      break;
    case 'conference':
      if (item['location']) {
        subtitle = item['location'];
      }
      break;
    case 'author':
      if (item['affiliation']) {
        subtitle = item['affiliation'];
      }
      break;
    default:
    }
    var snippet = TITLE_TEMPLATE.replace(/_TITLE_/g, item['title']).replace(/_URL_/g, item['url']).replace(/_QUERY_/g, search);
    if (subtitle) {
      snippet += SUBTITLE_TEMPLATE.replace(/_SUBTITLE_/, subtitle);
    }
    return snippet + '</div>';
  },
  source: function(phrase, response){
      $.getJSON('/ac', { q: phrase }, function(data){
      console.dir(data);
      if (data.length > 10) {
        data = data.slice(0, 10);
      }
      response(data.results);
    });
  }
});
