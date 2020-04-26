const {pathToFile, width, height, titleconfig, nameconfig, islandconfig, dodocodeconfig} = require('./config.json');
const fs = require('fs');
const {createCanvas, loadImage} = require('canvas');

const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');

const cacheMap = new Map();

module.exports =
{
    create(island)
    {
        cache(island);
        loadImage('./dodo_code.png').then(image => {
            context.drawImage(image, 0, 0, width, height);
            if(island.title)
            {
                const xpos = titleconfig.xpos + titleconfig.width / 2;
                const ypos = titleconfig.ypos + titleconfig.height / 2;
                context.font = titleconfig.fontsize + " Comic Sans MS";
                context.fillStyle = "white";
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText(island.title, xpos, ypos, titleconfig.width);
            }
            
            if(island.name)
            {
                let xpos = nameconfig.xpos + nameconfig.width / 2;
                let ypos = nameconfig.ypos + nameconfig.height / 2;
                let fontsize = nameconfig.fontsize;
                if(!island.title)
                {
                    xpos = titleconfig.xpos + titleconfig.width / 2;
                    ypos = titleconfig.ypos + (titleconfig.height + nameconfig.height) / 2;
                    fontsize = nameconfig.alternativeFontsize;
                }
                context.font = fontsize + " Comic Sans MS";                
                context.fillStyle = "white";
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText(island.name, xpos, ypos, nameconfig.width);
            }

            if(island.island)
            {
                const xpos = islandconfig.xpos + islandconfig.width / 2;
                const ypos = islandconfig.ypos + islandconfig.height / 2;
                context.font = islandconfig.fontsize + " Comic Sans MS";
                context.fillStyle = "white";
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText(island.island, xpos, ypos, islandconfig.width);
            }

            if(island.dodocode)
            {
                const xpos = dodocodeconfig.xpos + dodocodeconfig.width / 2;
                const ypos = dodocodeconfig.ypos + dodocodeconfig.height / 2;
                context.font = dodocodeconfig.fontsize + " Comic Sans MS";
                context.fillStyle = "white";
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText(island.dodocode, xpos, ypos, dodocodeconfig.width);
            }

            loadImage('./dodo_code_lines.png').then(image => {
                context.drawImage(image, 0, 0, width, height);
                const buffer = canvas.toBuffer('image/png');
                const filename = pathToFile + '/' + island.serverid + '-' + island.userid + '.png';
                fs.writeFileSync(filename, buffer);
                dataURL = canvas.toDataURL();
                island.dataURL = dataURL;
            });
        });        
    },

    retrieveUrl(user)
    {
        if(cacheMap.has(user.serverid))
        {
            let serverMap = cacheMap.get(user.serverid);
            if(serverMap.has(user.userid))
            {
                island = serverMap.get(user.userid);
                if(island.dataURL)
                {
                    return island.dataURL;
                }
            }
        }
        return;
    }
}

function cache(island)
{
    let userMap;
    if(cacheMap.has(island.serverid))
    {
        userMap = cacheMap.get(island.serverid);
    }
    else
    {
        userMap = new Map();
        cacheMap.set(island.serverid, userMap);
    }

    let user;
    if(userMap.has(island.userid))
    {
        user = userMap.get(island.userid);
    }
    else
    {
        user = island;
        userMap.set(island.userid, user);
    }
}