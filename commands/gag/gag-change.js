const mongo = require('../../mongo.js')

module.exports = {
    name: 'Установка прикола', // Optional
    commands: ['g'], // Optional
    aliases: ['п'], // Optional
    expectedArgs: '<gagName>',
    minArgs: 1,
    maxArgs: 1,
    cooldown: '10s',
    category: 'Приколы',
    description: 'Выбрать себе прикол',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const mainGuild = client.guilds.cache.get('579709976029691905')
        const logChannel = mainGuild.channels.cache.get('807116096586252289')
        const logMessage = `>${message.author.username}(${message.guild.member(message.author).nickname}) выбрал прикол "${args[0]}"`

        const mongo = require('../../mongo')  
        const gagSchema = require('../../schemas/gag-schema')
        const gagcountSchema = require('../../schemas/gagcount-schema')
        const gagName = args[0]
        let isGag = false
        //requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, '../../audio');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        if(text == file.slice(0, -4)) isGag = true
    });
});

        if (!isGag) return message.reply('Такого прикола у меня нет о_0')

        logChannel.send(logMessage)
    
        

            await mongo().then(async mongoose => {
                try {
                    await gagSchema.findOneAndUpdate(
                    {
                        _id: message.author.id
                    }, 
                    {
                        _id: message.author.id,
                        text: gagName,
                    }
                    , 
                    {
                        upsert: true
                    }
                    )
                } finally {
                    mongoose.connection.close()
                }
            })
            await mongo().then(async mongoose => {
                try {
                    await gagcountSchema.findOneAndUpdate(
                    {
                        _id: gagName
                    }, 
                    {
                        _id: gagName    
                    }
                    , 
                    {
                        upsert: true
                    }
                    )
                } finally {
                    mongoose.connection.close()
                }
            }) 
            message.react('👌');
    }
}