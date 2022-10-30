let currDate = document.getElementById("date");
let weathercon = document.getElementById("weathercon");

const getCurrentDay = () => {
    var my_day = new Date()
    //var dt = new Date(\"Aug 16, 2005 05:55:00\");

    //console.log("hethh");
    var day_name = new Array(7);

    day_name[0] = 'Sun'
    day_name[1] = ' Mon'
    day_name[2] = 'Tue'
    day_name[3] = 'Wed'
    day_name[4] = 'Thu'
    day_name[5] = 'Fri'
    day_name[6] = 'Sat'


    let day = (day_name[my_day.getDay()]);
    return day;
};


const getCurrentTime = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var now = new Date();
    var month = months[now.getMonth() + 1];
    var date = now.getDate();
    var year = now.getFullYear();

    let hours = now.getHours();
    let mins = now.getMinutes();
    let period = "AM";
    if (hours > 11) {
        period = "PM";
        if (hours > 12)
            hours -= 12;

    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    return `${month} ${date} | ${hours}:${mins}${period}`;

};

currDate.innerHTML = getCurrentDay() + " | " + getCurrentTime();

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}




let input = document.querySelector(".input");
input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        let searchValue = input.value;
        let data;
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=55a337cd589ed3956d538b86b0194ea6`).then((response) => {
            return response.json();
        }).then(res => {
            console.log(res);
            data = res;
        })

        input.value="";

        document.querySelector('.place').innerHTML = `${data.name}, ${data.sys.country}`;
        document.querySelector('.temp').innerHTML = `${round(data.main.temp-273,2)} &deg;C`;
        document.querySelector('.tempmin_max').innerHTML = `Min ${round(data.main.temp_min-273,2)} &deg;C | Max ${round(data.main.temp_max-273,2)} &deg;C`;
        let tempStatus=data.weather[0].main;

        if (tempStatus == "Sunny"){ 
            weathercon.innerHTML = "<i class='fa-solid fa-sun' style='color:#eccc68;'></i>";
        } else if (tempStatus == "Cloud") {
            weathercon.innerHTML = "<i class='fa-solid fa-cloud' style='color:#FFFFFF;'></i>";
        }
        else if (tempStatus == "Rainy") {
            weathercon.innerHTML = "<i class='fa-solid fa-cloud-drizzle' style :'color=#FFFFFF;'></i>";
        }
        else {
            weathercon.innerHTML = "<i class='fa-solid fa-cloud-sun-rain' style= ' color: #FFFFFF;'></i>";
        }

    }
})