var TITLE_TEMPLATE = '<span class="suggestion-title">_TITLE_</span>';
var SUBTITLE_TEMPLATE = '<br><span class="subtitle">_SUBTITLE_</span>';

function getSnippet(value, item) {
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
    case 'static':
      subtitle = item['url'];
      break;
    default:
  }
  var snippet = TITLE_TEMPLATE.replace(/_TITLE_/g, item['title']);
  if (subtitle) {
    snippet += SUBTITLE_TEMPLATE.replace(/_SUBTITLE_/, subtitle);
  }
  return snippet;
}

// Since there are two search boxes in the dropdown version, we apply
// easyAutocomplete to everything with a given class (and save this as self).
$(document).ready(function() {
  $('.searchBoxes').each(function() {
    var self = this;
    $(this).easyAutocomplete({
      url: function(query) {
        return '/ac?ac=1&q=' + encodeURI(query);
      },
      // Without this, bootstrap css doesn't work with easyautocomplete.
      // The col part was found on
      // https://stackoverflow.com/questions/48079613/width-override-of-easyautocomplete-plugin-inside-input-group-addon
      cssClasses: 'col px-0',
      adjustWidth: false,
      list: {
        // One extra for the one we add in ajaxCallback
        maxNumberOfElements: 21,
        onClickEvent: function() {
          window.location = $(self).getSelectedItemData().url;
        },
        showAnimation: {
          type: "slide", //normal|slide|fade
          time: 200,
          callback: function() {}
        }
      },
      ajaxCallback: function(data) {
        data.results.push({doctype: 'static',
                           title: "More results from local search on iacr.org",
                           url: 'https://iacr.org/foo'});
      },
      // This says where to find the list of results.
      listLocation: 'results',
      // This says that the value is in the 'title' field of a result.
      getValue: 'title',
      template: {
        type: 'custom',
        method: function(value, item) {
          return getSnippet(value, item);
        }
      },
      ajaxSettings: {
        dataType: 'json'
      },
    });
  })
});

