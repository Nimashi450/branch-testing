
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuZGFydTA5IiwiYSI6ImNrczc4cWFtbjJvZXoydnFtNmtrNThicXIifQ.s7R1YyvMV0-5mR5uEaAa8w';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/outdoors-v11',
center: [80.6337,7.2906],
zoom: 8
});
/// change this part for multiple clients ////
//var id_user = MYUSER;

// $.ajax({
// 	url : 'fetchFarmData.php', // your php file
// 	async: true,
// 	type : 'GET', // type of the HTTP request
// 	success : function(data){
// 	   var obj = jQuery.parseJSON(data); 
// 	  //  order by 'dataID' 
// 	  //  DESC limit 5
// 	  var id_location = obj['farmID'];
// 	  var farm_longitude = obj['farmLongitude'];
// 	  var farm_latitude = obj['farmLatitude'];
// 	  var farm_location = obj['farm_address'];
// 	  var farm_name = obj['farm_name'];
// 	  getData(obj);
// 	}
//   });

console.log("Farm Location is......." + farm_location);


var id_location = [];
////////////////////////////////////////////////////////////////////
var all_location = [];
var all_details =[];

for(var i = 0; i < farm_id.length; i++){

	id_location[i] = farm_id[i];
	all_location[i] = [farm_longitude[i],farm_latitude[i]];
	all_details[i] =[farm_location[i],farm_name[i]];

}


console.log("Farm all_location is......." + all_location);
console.log("Farm all_detail is......." + all_details);

var all_values =[[1,1,1,1,1,1,1,1,1,1],[10,15.3,81,16.7,15,11,21,7.9,1,1],[10,15.3,81,16.7,15,11,21,7.9,1,1]]; // some random values are used to test
var all_average =[[1,1,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1,0]];
var m_mois =0;
var m_temp =0;
var m_hum =0;
var m_lux =0;
var m_ph =0;
var m_sec =0;
var m_rain =0;
var m_sn =0;
var m_sp =0;
var m_sk =0;
var m_location='';
var m_farm='';
var locID = '';

// var m_mois =[];
// var m_temp =[];
// var m_hum =[];
// var m_lux =[];
// var m_ph =[];
// var m_sec =[];
// var m_rain =[];
// var m_sn =[];
// var m_sp =[];
// var m_sk =[];
// var m_location=[];
// var m_farm=;

function asign_val(title){
	for (let i = 0; i < all_location.length; i++) {
	
	if(id_location[i]==title)
		 {
		 console.log(title);
		  m_mois = all_values[i][0];
		  m_temp = all_values[i][1];
		  m_hum = all_values[i][2];
		  m_lux = all_values[i][3];
		  m_ph = all_values[i][4];
		  m_sec = all_values[i][5];
		  m_rain = all_values[i][6];
		  m_sn = all_values[i][7];
		  m_sp = all_values[i][8];
		  m_sk = all_values[i][9];
		  m_location = all_details[i][0];
		  m_farm = all_details[i][1];
		  locID = id_location[i];
		  
		 }
	}
}



map.on('load', () => {
// Load an image from an external URL.
map.loadImage(
'https://img.icons8.com/ios-filled/50/000000/marker.png',
(error, image) => {
if (error) throw error;
 
// Add the image to the map style.
map.addImage('n_select', image);
}
);
map.loadImage(
'https://img.icons8.com/ios-filled/50/000000/pointer.png',
(error, image) => {
if (error) throw error;
 
// Add the image to the map style.
map.addImage('y_select', image);
}
);


for (let i = 0; i < all_location.length; i++) {
  
	// Add a data source containing one point feature.
	map.addSource('point'+i, {
	'type': 'geojson',
	'data': {
	'type': 'FeatureCollection',
	'features': [
	// cod 1
	{
	'type': 'Feature',
	'geometry': {
	'type': 'Point',
	'coordinates': all_location[i] },
	'properties': {
	'title': id_location[i]}
	},


	]
	}
	});

	// Add a layer to use the image to represent the data.
	map.addLayer({
	'id': 'circle'+i,
	'type': 'symbol',
	'source': 'point'+i, // reference the data source
	'layout': {
	'icon-allow-overlap': true,
	'icon-image': 'n_select', // reference the image
	'icon-offset': [0,-20] ,
	'icon-size': 1}

	});
	map.setLayoutProperty('circle'+i,'icon-image','y_select');		
	map.flyTo({center: all_location[i]});

}

   
for (let i = 0; i < all_location.length+1; i++) {


	var setzoom =20;

	// Center the map on the coordinates of any clicked circle from the 'circle' layer.
	map.on('click', 'circle'+i, (e) => {
	if (map.getZoom()>20){setzoom=map.getZoom();}
	map.flyTo({center: map.getSource(e.features[0].source)._data.features[0].geometry.coordinates,offset:[-80,-100], zoom:setzoom});
	us_location = id_location[i];
	
	map.setLayoutProperty('circle'+i,'icon-image','y_select');
	// map.setLayoutProperty('circle'+i,'icon-allow-overlap' ,true);
	console.log(`Selected Location: ${us_location}`);
	for (let j = 0; j < all_location.length; j++) {
			if(j!=i){map.setLayoutProperty('circle'+j,'icon-image','n_select');
						// map.setLayoutProperty('circle'+j,'icon-allow-overlap' ,true);
						}	

		}
		
	});


	// Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
	//you should need to use line 192-235 again if you want to add another farm for a same user
	
	let j = 0;
	while(j<all_location.length){

		map.on('mouseenter', 'circle'+j, (e) => {
		map.getCanvas().style.cursor = 'pointer';
		asign_val(map.getSource(e.features[0].source)._data.features[0].properties.title);
		console.log("Title : "+map.getSource(e.features[0].source)._data.features[0].properties.title);
		console.log("Coordinates: "+map.getSource(e.features[0].source)._data.features[0].geometry.coordinates);
		popup.setLngLat(map.getSource(e.features[0].source)._data.features[0].geometry.coordinates).setHTML(`
			<div class="widget-container">
				<div class="top-left">
					<h1 class="city" id="city">Location</h1>
					<h2 id="day">`+m_location+`</h2>		      
				</div>
				<div class="top-right">
					<h1 id="weather-status">`+m_farm+` Farm</h1>
					<img class="weather-icon" src="https://myleschuahiock.files.wordpress.com/2016/02/sunny2.png">
				</div>
				<div class="bottom-left">
					<div class="flex-container">
					<div class="flex-box">
						<p class="p1">S-Moisture</p>
						<h3 class="celsius">`+m_mois+`</h3>
						<h3 id="fahrenheit"><small>g/m<sup>3</sup></small></h3>
					</div>
					<div class="flex-box">
						<p class="p1">S-Temprature</p>
						<h3 class="celsius">`+m_temp+`</h3>
						<h3 id="fahrenheit"><small>c</small></h3>
					</div>
					<div class="flex-box">
						<p class="p1">Humidity</p>
						<h3 class="celsius">`+m_hum+`</h3>
						<h3 id="fahrenheit"><small>kg<sup>2</sup></small></h3>
					</div>
					<div class="flex-box2">
						<p class="p1">Temprature</p>
						<h3 class="celsius">`+m_lux+`</h3>
						<h3 id="fahrenheit"><small>c</small></h3>
					</div>
					</div>
				</div>
			</div>
			`
			).addTo(map);
			

		});


		// Change it back to a pointer when it leaves.
		map.on('mouseleave', 'circle'+j, () => {
		map.getCanvas().style.cursor = '';
		popup.remove();
		});
		j++;
    }


	// map.on('zoomstart', function (e) { map.flyTo({center: e.features[0].geometry.coordinates}); });

	map.on('mousemove',  (e) => {
		// window.scroll(50, 100);
		// console.log("ok");
		// console.log(us_location);
		// $('html').removeClass('perfect-scrollbar-on');
		// window.scrollTo(0, 500); 
		document.getElementById('info').innerHTML =
		// `e.point` is the x, y coordinates of the `mousemove` event
		// relative to the top-left corner of the map.
		JSON.stringify(e.point) +
		'<br />' +
		// `e.lngLat` is the longitude, latitude geographical position of the event.
		JSON.stringify(e.lngLat.wrap());
		
	});
	const popup = new mapboxgl.Popup({
						closeButton: false,
						closeOnClick: false,
						offset: 10
					})
		
}

	
	    

});
console.log(`Selected coordinate: ${id_location}`);
// map.scrollZoom.disable();
document.getElementById("map").addEventListener("mouseover", mouseOver);
document.getElementById("map").addEventListener("mouseout", mouseOut);

function mouseOver() {
  $('html').removeClass('perfect-scrollbar-on');
  document.getElementById("mYdiv").scrollIntoView();
}

function mouseOut() {
	var setzoom=8;
	$('html').addClass('perfect-scrollbar-on');
	document.getElementById("mYdiv").scrollIntoView();
	// var y = window.scrollY;
	// console.log(y);
	// window.scrollTo(y,y)
	// if (map.getZoom()<8){setzoom=map.getZoom();}
	// map.flyTo({zoom:setzoom});
}




