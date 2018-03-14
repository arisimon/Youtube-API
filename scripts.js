'use strict';

const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyAzAoS4LK4YuMX7WMRbIhhRlt25r7hGfPA';

function getDataFromApi(searchTerm, callback) {
  let query = {
    part: 'snippet',
    key: API_KEY,
    q: searchTerm,
    maxResults: 28,
  }
  $.getJSON(YOUTUBE_URL, query, function(data) {
    renderResults(data);
  });
}

function renderResults(data) {
  let results = data.items.length;

  let resultVideo = '';
  if (data.items) {
    data.items.forEach(function(item) {
     if (item.id.kind === 'youtube#channel') {
        resultVideo += '<div class="result-item"><a href="https://www.youtube.com/channel/' + item.snippet.channelId + 
        '" target="_blank"><img width="110px" height="110px" src="' + item.snippet.thumbnails.medium.url + '"><br>' + item.snippet.channelTitle + 
        '</a></div>';
          $('.js-results-number').html(`Your search returned ${results} results`); 
     } else {
        resultVideo += '<div class="result-item"><a href="https://www.youtube.com/watch?v=' + item.id.videoId + 
        '" target="_blank"><img width="196px" height="110px" src="' + item.snippet.thumbnails.medium.url + '">' + 
        item.snippet.title + '</a><br><span><a href="https://www.youtube.com/channel/' + item.snippet.channelId + 
        '" target="_blank">' + item.snippet.channelTitle + '</a></span></div>'; 
        $('.js-results-number').html(`Your search returned ${results} results`); 
     }
    });
  }
  else {
    resultVideo += '<p>No results</p>';
    $('.js-results-number').html(`Your search returned ${results} results`); 
  }

  $('.js-search-results').html(resultVideo);
} 




function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    let query = $(this).find('.js-search-input').val();
    getDataFromApi(query, renderResults);
  });
}

watchSubmit();