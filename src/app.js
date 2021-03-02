const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static dir to serve
app.use(express.static(publicDirPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Felipe Vallina'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Felipe Vallina'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        info: 'Please communicate to 55555 for help. Thanks!',
        name: 'Felipe Vallina'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geoCode(req.query.address, (error, {
        latitude,
        longitude,
        placeName
    } = {}) => {
        if (error || req.query.address === undefined) return res.send({
            error
        })

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) return res.send({
                error
            });

            res.send([{
                forecast: forecastData,
                location: placeName,
                address: req.query.address,
            }])
        })


    });


});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        errorInfo: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorInfo: 'Link not found.',
        name: 'Felipe Vallina'
    })
});

app.listen(port, () => {
    console.log('listening on port ' + port )
});