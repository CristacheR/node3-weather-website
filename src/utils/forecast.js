const request =require('request')

const forecast = (lat,long,callback) => {
    const url ='https://api.darksky.net/forecast/4445347644485e078da5e80dc4656d1d/'+ lat +','+ long + '?units=si&lang=ro'
    
    request({ url, json: true}, (error, {body})=> {
        if (error){
            callback ('Unable to onect to weather service!', undefined)
        } else if (body.error) {
            callback ('Unable to find location',undefined)
        } else {
            callback (undefined, {
                placename: body.daily.data[0].summary,
                temperature: body.currently.temperature, 
                RainChance: body.currently.precipProbability 
            })
        }
           
    })
}
module.exports = forecast