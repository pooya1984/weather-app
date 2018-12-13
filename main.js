let user = '';
let unit = '';
let ckbox = $('#x');
let fkbox = $('#f');
let tempUnit = ' °F';



$('#add').hide();
$('#favorite').hide();
$('.fa-sun').hide();
$('.fa-moon').hide();
$('.history').hide();
$('.container').css('background-image', 'url("http://ayay.co.uk/mobiles/weather/strange/northern-lights.jpg")');


//let card = document.getElementById('word');
//card =document.createElement('li');

$('input').on('click', function () {
    if (ckbox.is(':checked')) {
        unit = 'metric';
        tempUnit = ' °C'
    } else if (fkbox.is(':checked')) {
        unit = 'fahrenheit';
        tempUnit = ' °F'
    }
});

$('#bTn').click(function () {


    user = $('#place').val();
    //console.log(user);

    $('#place').hide();
    $('#add').show();
    $('#favorite').show();
    $('#favorite').css('color', 'rgba(252, 250, 250, 0.164)')
    $('.fa-sun').show();
    $('.fa-moon').show();
    $('#add').click(function () {
        $(this).hide();
        $('#place').show();
        $('#place').val('');
        $('#favorite').hide();
        $('.history').hide();
    })



    function weather() {

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${user}&units=${unit}&maka&APPID=e7daac44478b7ae8b900daf74f3a1bef`;
        console.log(url);
        $.getJSON([url]).then((data) =>
            changeD(data))
            .catch((data) => changDErrorMessage(data))

console.log(data);

    }
    weather();




    function changeD(data) {
        let country = data.sys.country;
        let city = data.name;
        let temp = Math.round(data.main.temp);
        let humidity = data.main.humidity;
        let windSpeed = data.wind.speed;
        let desc = data.weather[0].description;
        let icon = data.weather[0].icon;
        let sunriseSec = data.sys.sunrise;
        let sunsetSec = data.sys.sunset;
        let iconSrc = `http://openweathermap.org/img/w/${icon}.png`;
        let main = data.weather[0].main;
        let weatherImg = selectImg(main);
        console.log(weatherImg);



        /** adding favorite */

        $('#favorite').click(function () {

            $(this).css('hover', '#8a2b4b');
            $(this).hide();




            $('.history').show();
            $('#city').html('');
            $('#icon').attr('src', '');
            $('#desc').html('');
            $('#temp').html('');
            $('#country').html('');
            $('#humidity').html('');
            $('#windSpeed').html('');
            $('#sunrise').html('');
            $('#sunset').html('');
            $('.fa-sun').hide();
            $('.fa-moon').hide();



            // console.log(favoriteContainer);

            class ListOfFavorite {

                constructor(element) {
                    this.element = element;
                    this.favoriteList = [];

                }

                deleteAll() {
                    while (this.element.firstChild)
                        this.element.removeChild(this.element.firstChild);
                }


                update() {
                    this.deleteAll();

                    for (let text of this.favoriteList) {

                        let favoriteContainer = document.createElement('div');
                        favoriteContainer.textContent = text;
                        this.element.appendChild(text);
                    }
                }

                add(favoriteContainer) {

                    this.favorite = [];
                    this.favorite.push(data);
                    this.favorite.forEach(item => {


                        let faCity = item.name;
                        let faTemp = Math.round(item.main.temp);
                        favoriteContainer = faCity + faTemp;


                    })
                    this.favoriteList.push(favoriteContainer);
                    // console.log(this.favoriteList);
                    this.update();
                };
                deleteFirst() {
                    this.favoriteList.shift();
                    this.update();
                }

            }

            let doneList = document.getElementById('history');
            let listOfFavorite = new ListOfFavorite(doneList);
            listOfFavorite.add(favoriteContainer);
            listOfFavorite.update();



        })


        let sunriseDate = new Date(sunriseSec * 1000);
        let sunriseTime = sunriseDate.toLocaleTimeString();

        let sunsetDate = new Date(sunsetSec * 1000);
        let sunsetTime = sunsetDate.toLocaleTimeString();


        $('#city').html(city);
        $('#country').html(country);
        $('#temp').html(temp + '' + tempUnit);
        $('#desc').html(desc);
        $('#humidity').html('humidity: ' + humidity + '%');
        $('#windSpeed').html('wind speed: ' + windSpeed + ' k/h');
        $('#icon').attr('src', iconSrc);
        $('.container').css('background-image', 'url(' + weatherImg + ')');
        $('#sunrise').html(sunriseTime);
        $('#sunset').html(sunsetTime);


    }

    function selectImg(main) {
        let img = {
            rain: "https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            sunny: "https://images.pexels.com/photos/3590/nature-sky-sunny-clouds.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            snow: "https://images.pexels.com/photos/66284/winter-nature-season-trees-66284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            cloud: "https://images.pexels.com/photos/601798/pexels-photo-601798.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        };
        if (main === "Clear") {
            return img.sunny;
        } else if (main === "Clouds") {
            return img.cloud;
        } else if (main === "Snow") {
            return img.snow;
        } else if (main === "Rain") {
            return img.rain;
        }

    }

    function changDErrorMessage(data) {

        let iconError = `https://www.freeiconspng.com/uploads/sign-red-error-icon-1.png`

        console.log(data.statusText);
        alert(data.statusText);
        $('#city').html('');
        $('#icon').attr('src', iconError);
        $('#temp').html('');
        $('#country').html('');
        $('#humidity').html('');
        $('#windSpeed').html('');
        $('#sunrise').html('');
        $('#sunset').html('');
        $('.fa-sun').hide();
        $('.fa-moon').hide();
        $('.history').hide();
        $('#favorite').hide();


        $('#desc').html("this City doesn't find. please try again");

    }



});

