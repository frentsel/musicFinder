var setPage = function(page, obj) {
  $('section').addClass('hide');
  $('li').removeClass('active');
  $('#' + page).removeClass('hide');
  $(obj).addClass('active');
}

var render = function(items) {
  var html = '';
  items.forEach(function(el) {
    html +=
      `<article>
        <img src="${el.image[2]['#text']}" onclick="popup.show('${el.name}')" />
        <a href="https://www.last.fm/ru/music/${el.name}" target="_blank">${el.name}</a>
      </article>`;
  });
  $('#list').html(html);
};

var search = function(str) {

  if (!str.length) {
    return false
  }

  $('#loader').removeClass('hide');

  var url = 'https://ws.audioscrobbler.com/2.0/';
  var params = {
    limit: 12,
    artist: str,
    method: 'artist.search',
    api_key: '23caa86333d2cb2055fa82129802780a',
    format: 'json'
  };

  $.getJSON(url, params)
    .then(function(data) {
      render(data.results.artistmatches.artist);
      $('#loader').addClass('hide');
    });
}

var popup = {
  show: function(artist) {
    var width = window.innerWidth > 360 ? 360 : window.innerWidth * .9;
    var url = "https://www.youtube.com/embed?listType=search&video&list=" + artist;
    var html = `<iframe src="${url}" width="${width}" height="220" frameborder="0"></iframe>`;
    $('#popup').html(html).addClass('show');
  },
  hide: function() {
    $('#popup').html('').removeClass('show');
  }
}

search('a');