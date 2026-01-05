const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() 

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Marilyn Castro'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Marilyn Castro'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Weather App',
        name: 'Marilyn Castro'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    const units = req.query.units || 'f'

    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(address, (error, { longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(longitude, latitude, units, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.use('/help', (req, res) => {
    res.status(404).render('404', {
        title: '404',
        name: 'Marilyn Castro',
        errorMessage: 'Help article not found.'
    })
})

app.use((req, res) => {
    res.status(404).render('404', {
        title: '404',
        name: 'Marilyn Castro',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})