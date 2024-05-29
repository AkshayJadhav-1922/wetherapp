import React, { useState } from 'react'
import './WetherApp.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'

function WetherApp() {
    let apiKey = 'ab36010074aaced599060b2df64e3c0c'
    const [searchValue, setSearchValue] = useState('London')
    const [humidityPercent, setHumidityPerent] = useState('64 ')
    const [windSpeed, setWindSpeed] = useState('18 ')
    const [temp, setTemp] = useState('24')
    const [wicon, setWicon] = useState(cloud_icon)

    const search = async () =>
    {
        
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${apiKey}`
        
        let response = await fetch(apiUrl)
        let data = await response.json();
        console.log(data)
        const htmlName = document.getElementsByClassName('weather-location')
        setHumidityPerent(data.main.humidity)
        setWindSpeed(Math.floor(data.wind.speed))
        setTemp(Math.floor(data.main.temp))
        setSearchValue(data.name)
        htmlName[0].innerHTML = searchValue

        switch(data.weather[0].icon){
            case '01d','01n': setWicon(clear_icon)
            case '02d','02n': setWicon(cloud_icon)
            case '03d','03n','04d','04n': setWicon(drizzle_icon)
            case '09d','09n','10d','10n': setWicon(rain_icon)
            case '13d','13n': setWicon(snow_icon)
            default:  setWicon(clear_icon)
        }
    }

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text" className='cityInput' placeholder='Search' onChange={(e)=> setSearchValue(e.target.value)} ></input>
                <div className='search-icon' onClick={search}>
                    <img src={search_icon}/>
                </div>
            </div>
            <div className='weather-image'>
                <img src={wicon}/>
            </div>
            <div className='weather-temp'> {temp}°c</div>
            <div className='weather-location'>London</div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} className='icon'/>
                    <div className='data'>
                        <div className='humidity-percent'>{humidityPercent} %</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={wind_icon} className='icon'/>
                    <div className='data'>
                        <div className='humidity-percent'>{windSpeed} km/h</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WetherApp;