function convert(input) {
    return moment(input, 'HH:mm').format('h:mm');
}



let mapnum = {
    "0":"۰",
    "1":"۱",
    "2":"۲",
    "3":"۳",
    "4":"٤",
    "5":"۵",
    "6":"٦",
    "7":"۷",
    "8":"۸",
    "9":"۹",
}

function convertnumbers(number){

    let stringnumber = number.toString();
    let arabicnumber = "";

    for(var i in stringnumber){
        if(mapnum[stringnumber[i]]){
            arabicnumber += mapnum[stringnumber[i]];
        }
        else{
            arabicnumber += stringnumber[i];}
    }
    return arabicnumber;

}

const kelvin = 273;
const key = ""; //INSERT KEY HERE, TO GET A KEY PLEASE VISIT https://openweathermap.org/
document.getElementById('errmsg').style.display = 'none';
const notif = document.querySelector('#errmsg');
const locationCity = document.querySelector('#city');
const locationCountry = document.querySelector('#country');
const iconElement = document.querySelector('#weather-icon');
const temp = document.querySelector('#c');
const description = document.querySelector('#desc');
const sunRise = document.querySelector('#sunrise');
const sunSet = document.querySelector('#sunset');


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
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+ lat + "&lon="+ long +"&appid="+key+"&units=metric"+"&lang=ar")
        .then(Response => Response.json()).then(data => 
        {
            if(data != null){
                console.log(data);
                var cityName = data['name'];
                var tempValue = data['main']['temp'];
                var descvalue = data['weather'][0]['description'];
                var sunRiseUnix = new Date (data['sys']['sunrise'] * 1000);
                var sunSetUnix = new Date (data['sys']['sunset'] * 1000);
                locationCity.innerHTML = cityName;
                sunRiseUnix = sunRiseUnix.getHours() +":" + sunRiseUnix.getMinutes();
                sunSetUnix = sunSetUnix.getHours() +":" + sunSetUnix.getMinutes();

                temp.innerHTML = convertnumbers(Math.round(tempValue))+"\u00B0";
                description.innerHTML =descvalue;


                sunRise.innerHTML = convertnumbers(sunRiseUnix)+" :الشروق";
                sunSet.innerHTML = convertnumbers(convert(sunSetUnix)).concat(" :الغروب")
                }
            })


    }


function showErr(error){
    console.log(error);
    document.getElementById('errmsg').style.display = 'block';
    if(error.message === 'User denied Geolocation'){
        document.getElementById('errmsg').innerHTML = "<p font-weight: bolder>"+'Please allow access to your geolocation'+"</p>";    
    }
    //document.getElementById('errmsg').innerHTML = "<p>"+error.message+"</p>";
}