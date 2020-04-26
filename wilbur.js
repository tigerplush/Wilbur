const graphic = require('./graphic.js');
const express = require('express');
const app = express();
const fs = require('fs');

const {pathToFile} = require('./config.json');

if (!fs.existsSync(pathToFile))
{
    fs.mkdirSync(pathToFile);
}

app.listen(3000, console.log('listening on 3000'));

app.use(express.static('public'));
app.use(express.json());

app.post('/create', (req, res) => 
{
    island = req.body;
    graphic.create(island);
    res.json({
        status: "success"
    });
});

app.post('/fetch', (req, res) =>
{
    let baseUrl = graphic.retrieveUrl(req.body);
    res.json({
        status: baseUrl != null,
        dataURL: baseUrl
    });
});

app.post('/remove', (req, res) =>
{
    island = req.body;
    graphic.remove(island);
    res.json({
        status: "success"
    })
});