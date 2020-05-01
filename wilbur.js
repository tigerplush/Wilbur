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
    console.log("Image creation requested for");
    console.log(island);
    graphic.create(island);
    res.json({
        status: "success"
    });
});

app.post('/fetch', (req, res) =>
{
    const user = req.body;
    console.log("Image url requested for");
    console.log(user);
    let baseUrl = graphic.retrieveUrl(user);
    console.log("success: " + baseUrl != null);
    res.json({
        status: baseUrl != null,
        dataURL: baseUrl
    });
});

app.post('/remove', (req, res) =>
{
    island = req.body;
    console.log("Image removal requested for");
    console.log(island);
    const stat = graphic.remove(island);
    console.log(stat);
    res.json({
        status: stat
    })
});