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
                context.font = titleconfig.fontsize + " Comic Sans MS";
                context.fillStyle = "white";
                context.textAlign = "center";
                context.fillText(island.title, titleconfig.xpos, titleconfig.ypos);
            }
            
            if(island.name)
            {
                context.font = nameconfig.fontsize + " Comic Sans MS";
                context.fillStyle = "white";
                context.textAlign = "center";
                context.fillText(island.name, nameconfig.xpos, nameconfig.ypos);
            }

            if(island.island)
            {
                context.font = islandconfig.fontsize + " Comic Sans MS";
                context.fillStyle = "white";
                context.textAlign = "center";
                context.fillText(island.island, islandconfig.xpos, islandconfig.ypos);
            }

            if(island.dodocode)
            {
                context.font = dodocodeconfig.fontsize + " Comic Sans MS";
                context.fillStyle = "white";
                context.textAlign = "center";
                context.fillText(island.dodocode, dodocodeconfig.xpos, dodocodeconfig.ypos);
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