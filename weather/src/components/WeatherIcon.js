import React from 'react';
import { WiDaySunny,WiNightClear,WiDayCloudy,WiNightAltCloudy,
    WiCloudy,WiNightAltThunderstorm,WiDayThunderstorm,
    WiDayShowers,WiNightAltShowers,WiDayRain,WiNightRain, WiNightSnowThunderstorm, WiDaySnowThunderstorm,
    WiNightSnowWind,WiDaySnowWind, WiSnowflakeCold, 
    WiSmog, WiSmoke, WiFog, WiDust,WiHurricane,WiHorizonAlt,WiMoonAltWaningCrescent5} from "weather-icons-react";



const iconDecider = (description, sunrise, sunset) =>{
    const myDate = Date.now()

    if(myDate >= sunrise && myDate <= sunset){
        if(description.includes('clear sky') || description.includes('clear')){
            return <WiDaySunny key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('few clouds') || description.includes('scattered clouds') || description.includes('broken clouds')){
            return <WiDayCloudy key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('clouds')){
            return <WiCloudy key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('thunderstorm')){
            return <WiDayThunderstorm key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('shower rain') || description.includes('light rain') || description.includes('moderate rain') || description.includes('heavy intensity rain')){
            return <WiDayShowers key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('rain')){
            return <WiDayRain key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('Heavy snow')){
            return <WiDaySnowThunderstorm key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('sleet')){
            return <WiDaySnowWind key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('snow')){
            return <WiSnowflakeCold key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('Smoke')|| description.includes('Haze')){
            return <WiSmoke key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('fog')){
            return <WiFog key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('dust')){
            return <WiDust key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('tornado')){
            return <WiHurricane key={`${description}`}  size={100} color='#000' />
        }
        else{
            return <WiHorizonAlt key={`${description}`}  size={100} color='#000' />
            
        }
    }
    else {
        if(description.includes('clear sky') || description.includes('clear')){
            return <WiNightClear key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('few clouds') || description.includes('scattered clouds') || description.includes('broken clouds')){
            return <WiNightAltCloudy key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('clouds')){
            return <WiCloudy key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('thunderstorm')){
            return <WiNightAltThunderstorm key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('shower rain') || description.includes('light rain') || description.includes('moderate rain') || description.includes('heavy intensity rain')){
            return <WiNightAltShowers key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('rain')){
            return <WiNightRain key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('Heavy snow')){
            return <WiNightSnowThunderstorm key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('sleet')){
            return <WiNightSnowWind key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('snow')){
            return <WiSnowflakeCold key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('Smoke')|| description.includes('Haze')){
            return <WiSmog key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('fog')){
            return <WiFog key={`${description}`}  size={100} color='#000' />
        }
        if(description.includes('dust')){
            return <WiDust key={`${description}`}  size={100} color='#000' />
        } 
        if(description.includes('tornado')){
            return <WiHurricane key={`${description}`}  size={100} color='#000' />
        }
        else{
            return <WiMoonAltWaningCrescent5 key={`${description}`} size={100} color='#000' />
        }
    }
}

export default iconDecider;

