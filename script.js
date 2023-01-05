const kelvin = 273;
const key = "2449d9929be33e0af5bde76d1e7931af";
document.getElementById('errmsg').style.display = 'none';

const notif = document.querySelector('#errmsg');

const locationCity = document.querySelector('#city');
const locationCountry = document.querySelector('#country');
const iconElement = document.querySelector('#weather-icon');
const temp = document.querySelector('#c');
const description = document.querySelector('#desc');
const sunRise = document.querySelector('#sunrise');
const sunSet = document.querySelector('#sunset');

//{'https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=50a7aa80fa492fa92e874d23ad061374'}


if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition , showErr);
   
}
else{
    document.getElementById('errmsg').style.display = 'block';
    document.getElementById('errmsg').innerHTML = "<p>Sorry, your browser doesn't support GeoLocation</p>";
}
function setPosition(position){
        let abcd = document.querySelector('.mainContainer');
        abcd.classList.add('mainContaineranim');
        let cont = document.querySelector('.slide2');
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        //cont.style.zIndex="1" ;
        console.log(lat,long);
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+ lat + "&lon="+ long +"&appid="+key+"&units=metric")
        .then(Response => Response.json()).then(data => 
        {
            console.log(data)
            var cityName = data['name'];
            var countryName = data['sys']['country'];
            var tempValue = data['main']['temp'];
            var descvalue = data['weather'][0]['description'];
            
            var sunRiseUnix = new Date (data['sys']['sunrise'] * 1000);
            sunRiseUnix = sunRiseUnix.getHours() +":" + sunRiseUnix.getMinutes();
            
            locationCity.innerHTML = cityName;
            locationCountry.innerHTML = countryName;
            temp.innerHTML = tempValue;
            description.innerHTML = descvalue;


             sunRise.innerHTML = sunRiseUnix;
            // sunSet.innerHTML = data['sys']['sunset'];

        })
        .catch();
        //getWeather(lat , long);


}
function showErr(error){
    console.log(error);
    document.getElementById('errmsg').style.display = 'block';
    if(error.message === 'User denied Geolocation'){
        document.getElementById('errmsg').innerHTML = "<p>"+'Please allow access to your geolocation'+"</p>";    
    }
    //document.getElementById('errmsg').innerHTML = "<p>"+error.message+"</p>";
}