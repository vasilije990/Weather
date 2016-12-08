var placeSearch, autocomplete;   
  function initAutocomplete() {
        autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')),{types: ['geocode']});
        autocomplete.addListener('place_changed', function() {        
         var place = autocomplete.getPlace();
var a= place.address_components[0].long_name
var d= place.address_components[(place.address_components.length-1)].long_name
var c= place.geometry.location.lat
var b= place.geometry.location.lng
$('#grad').attr({
      'drzava': d,
       'grad': a ,
       'lat': c,
       'lng': b,
       'jedinica':'metric',
       'znak':'C <sup>o</sup>'
     });
        } );
$('#prikazi').on('click', function(){
$('table').empty()
$('#autocomplete').val('')
$('#vasa2').empty()
$('#vasa2').append("<button  id='far' type='button' >F/C<sup>0</sup></button>")
prikazi1()
$('#far').on('click', function(){

    var S=$('#grad').attr('jedinica')  
if (S==='imperial') {
 $('#grad').attr({
  'jedinica':'metric',
  'znak':'C<sup>o</sup>'
     });
prikazi1()
} else {
 $('#grad').attr({
  'jedinica':'imperial',
  'znak':'<sup>o</sup>F'
     });
prikazi1()
}
})
      });
      }
function prikazi1(){ 
$('table').empty();
 $('#grad').empty()
var J=$('#grad').attr('znak') 
var S=$('#grad').attr('jedinica')
var d=$('#grad').attr('drzava')
var c=$('#grad').attr('grad')
$('#grad').append(c+", "+d) 
var a=$('#grad').attr('lat')
var b=$('#grad').attr('lng')
$.ajax({
  url: 'http://api.openweathermap.org/data/2.5/weather?lat='+a+'&lon='+b+'&units='+S+'&appid=a49e7f706764e70dcb91ba3ebc2ed09c', 
  method:'GET'
})
.done(function(res) {
var n=res.main.temp
var icon='ss'
var min=res.main.temp_min
var max=res.main.temp_max
 $('table ').append( '<tr><th rowspan="2" colspan="2" id="tt"><h1>'+parseInt(n)+' '+J+'</h1></th><td>Min</td><td>Max</td></tr>');
  $('table').append( '<tr><th>  '+parseInt(min) +' '+J+' </th><th>'+parseInt(max)+' '+J+' </th></tr>');
prikazi()
})
}
function prikazi(){
var J=$('#grad').attr('znak') 
var S=$('#grad').attr('jedinica')
var a=$('#grad').attr('lat')
var b=$('#grad').attr('lng') 
$.ajax({
  url: 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+a+'&lon='+b+'&cnt=8&mode=json&units='+S+'&appid=a49e7f706764e70dcb91ba3ebc2ed09c',  
  method:'GET'
})
.done(function(res) {
var weekday = ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"]
var pozadina={ 
'Clear': 'http://openwalls.com/image/14656/few_small_clouds_1400x1050.jpg',
'Clouds':'http://cloud-maven.com/wp-content/uploads/2012/07/DSC083701.jpg',
'Extreme':'http://www.worldatlas.com/upload/21/84/1f/tornado-supercell.jpg',
'Drizzle':'https://i.ytimg.com/vi/Wml0XvPeoJI/maxresdefault.jpg',
'Rain':'https://www.surfdome.com/fashion_blog/wp-content/uploads/2012/04/shutterstock_34437904.jpg',
'Thunderstorm':'https://s-media-cache-ak0.pinimg.com/736x/d7/fa/4f/d7fa4f72d2a80e613f1a7f22e24640a8.jpg',
'Snow':'http://vignette4.wikia.nocookie.net/phobia/images/a/aa/Snow.jpg/revision/latest?cb=20161109045734',
'Atmosphere':'http://7art-screensavers.com/wallpapers/mist-0/xls/mystic-mist.jpg',
'Haze':'http://7art-screensavers.com/wallpapers/mist-0/xls/mystic-mist.jpg',
 }
var ii=pozadina[res.list[0].weather[0].main]
$("body").css({'background-image': 'url('+ii+')'});
for (var i = 1; i < res.list.length; i++) {
var ime_mesta=res.list[i].dt
var max=res.list[i].temp.max
var min=res.list[i].temp.min
var d = new Date(ime_mesta*1000);
var icon='<img src="http://openweathermap.org/img/w/'+res.list[i].weather[0].icon+'.png" alt="">'
if( i===0  )
{var n='Sutra' }
 else{ var n = weekday[d.getDay()];}
$('table').append( '<tr  ><td>'+n+'</td><td> '+icon+' </td><td> '+parseInt(min) +' '+J+'</td><td> '+parseInt(max)+' '+J+'</td></tr>');
}})
}