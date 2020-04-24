let titleconfig;
let nameconfig;
let islandconfig;
let dodocodeconfig;

$.getJSON("config.json", function(json) {
    ({titleconfig, nameconfig, islandconfig, dodocodeconfig} = json);
    fillDAL();
});

function fillDAL()
{    
    const urlParams = new URLSearchParams(window.location.search);

    const title = urlParams.get('title');
    const name = urlParams.get('name');
    const island = urlParams.get('island');
    const dodocode = urlParams.get('dodocode');

    let canvas = document.getElementById("DALcanvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("DALflightplan");
    ctx.drawImage(img, 0, 0);

    if(title)
    {
        ctx.font = titleconfig.fontsize + " Comic Sans MS";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(title, titleconfig.xpos, titleconfig.ypos);
    }

    if(name)
    {
        ctx.font = nameconfig.fontsize + " Comic Sans MS";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(name, nameconfig.xpos, nameconfig.ypos);
    }

    if(island)
    {
        ctx.font = islandconfig.fontsize + " Comic Sans MS";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(island, islandconfig.xpos, islandconfig.ypos);
    }

    if(dodocode)
    {
        ctx.font = dodocodeconfig.fontsize + " Comic Sans MS";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(dodocode, dodocodeconfig.xpos, dodocodeconfig.ypos);
    }
    
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("DALflightplanLines");
    ctx.drawImage(img, 0, 0);

    var img = canvas.toDataURL("image/png");
    document.getElementById("baseURL").innerHTML = img;
}
