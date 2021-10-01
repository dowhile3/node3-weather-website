const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000 

// Define paths for Express config
const staticFilesPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views')
const partialsPath = path.join(__dirname, '../partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(staticFilesPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andy Smith'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Oscar wild'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ada avalance',
        helptext: 'It is a help page.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }



    geocode(req.query.address, (error, {latitude, longitude, location} = {})=> {
        if (latitude === undefined) {
            return res.send({
                errorMessage: error
            })
        }
        
        if (error === undefined) {
            let coordinates = latitude + ',' + longitude
            weather(coordinates, (errorWeather, {description, temperature, feelslike} = {}) => {
                
                if (errorWeather === undefined) {    
                    res.send({
                        address: req.query.address,
                        latitude: latitude,
                        longitude: longitude,
                        location,
                        forecast: description,
                        temperature,
                        feelslike,
                    })                    
                } 
            })
        } 
    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('help404', {
        title: '404',
        name: 'Steward Jones',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Demascus Hudson',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('running on port: ' + port)
})