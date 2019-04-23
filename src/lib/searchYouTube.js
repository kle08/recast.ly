
var searchYouTube = (options, callback) => {
  var url = "https://www.googleapis.com/youtube/v3/search";
  var data = {
    part: 'snippet',
    type: 'video',
    key: options.key,
    q: options.query,
    maxResults: options.max,
    videoEmbeddable: true
  };


  $.ajax({
    url: url,
    type: 'GET',
    contentType: 'application/json',
    data: data,
    // success: function(response) {
    //   //console.log(response.items);
    // },
    error: function (data) {
      console.error('Failed to fetch results', error);
    }
  }).done(function(response) {
    callback(response.items);
  });

};

export default searchYouTube;
