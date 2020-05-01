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

            if(island.dodoCode)
            {
                const xpos = dodocodeconfig.xpos + dodocodeconfig.width / 2;
                const ypos = dodocodeconfig.ypos + dodocodeconfig.height / 2;
                context.font = dodocodeconfig.fontsize + " Comic Sans MS";
                context.fillStyle = "white";
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText(island.dodoCode, xpos, ypos, dodocodeconfig.width);
            }

            loadImage('./dodo_code_lines.png').then(image => {
                context.drawImage(image, 0, 0, width, height);
                const buffer = canvas.toBuffer('image/png');
                const filename = pathToFile + '/' + getId(island) + '.png';
                fs.writeFileSync(filename, buffer);
                island.dataURL = buffer;
            });
        });
    },

    retrieveUrl(user)
    {
        if(cacheMap.has(getId(user)))
        {
            island = cacheMap.get(getId(user));
            if(island.dataURL)
            {
                return island.dataURL;
            }
        }
        return;
    },

    remove(island)
    {
        if(cacheMap.has(getId(island)))
        {
            const filename = pathToFile + '/' + getId(island) + '.png';
            if(fs.existsSync(filename))
            {
                fs.unlinkSync(filename);
            }
            cacheMap.delete(getId(island))
        }
    }
}

function cache(island)
{
    if(!cacheMap.has(getId(island)))
    {
        cacheMap.set(getId(island), island);
    }
}

function getId(island)
{
    return id = island.serverid + "-" + island.userid;
}