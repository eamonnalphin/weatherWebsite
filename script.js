// Docs at http://simpleweatherjs.com
$(document).ready(function() {

changeLocation('Vancouver,BC');

if ("geolocation" in navigator) {
  $('.js-geolocation').show(); 
} else {
  $('.js-geolocation').hide();
}

$('.js-geolocation').on('click', function() {
  navigator.geolocation.getCurrentPosition(function(position) {
  changeLocation(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });
});

});


function changeLocation(zipCodeValue){
  $.simpleWeather({
    location: zipCodeValue,
    woeid: '',
    unit: 'c',
    success: function(weather) {
      html = '<h2> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
      
      $("#weather").html(html);

      var keyword = weather.city + " " + weather.region;

      $('#ImageData').html(keyword);
      $('#ImageData').hide();

      $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        {
            tags: keyword,
            tagmode: "any",
            format: "json"
        },
        function(data) {
            var rnd = Math.floor(Math.random() * data.items.length);

            var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");

            $('body').css('background-image', "url('" + image_src + "')");
        });
      
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }


  });

}








