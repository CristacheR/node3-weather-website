const path = require('path')
const express = require('express')
const hbs = require ('hbs')
const geocode =require ('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Define paths
const publicDirPath =path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup server static
app.use(express.static (publicDirPath))


app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather',
        name: 'Cristache'
    })
})

app.get('/about',(req, res)=>{
    res.render ('about', {
        title: 'About',
        name: 'Cristache'
    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        title:'The Help Page',
        name:'Cristache'
    })
})


app.get('/weather', (req, res)=>{
    if (!req.query.address) {
        return res.send({error:'You must provide an adress'})
    }

    geocode(req.query.address, (error, { latitude, longitude, location}= { }) => {
        if (error) {
           return res.send ({ error })
        }

        forecast(latitude,longitude, (error,forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })
    })

    // res.send({
    //     forecast:'Weather Page',
    //     location:'Bucharest',
    //     address:req.query.address
    
    // })

})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name:'Cristache',
        errorMessage:'Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{ 
        title: '404',
        name:'Cristache',
        errorMessage:'Page not found'
    })
})


app.listen (port,() => {

    console.log('Server is up on port ' + port)
})