const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geoCode = require('./utils/geoCode.js');
const forcast = require('./utils/forcast.js');
const port = process.env.PORT || 3000;

// Default path for express confix
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Set handlebars engin  and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abhinav'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abhinav'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abhinav'
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            Error: 'Address must be provided'
        });
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ Error: error });
        }
        forcast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({ Error: error });
            }
            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            });
        });

    });

});

app.get('/products', (req, res) => {

    console.log(req.query);
    return res.send({
        products: []
    });

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Abhinav',
        errorMessage: 'Help Article not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhinav',
        errorMessage: 'Page Not Found'
    });
});

app.listen(port, () => {
    console.log('Server is up on port' + port);
});