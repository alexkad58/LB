const mongo = require('../mongo.js')

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

        const mongo = require('../mongo')  
        const gagSchema = require('../schemas/gag-schema')
        const gagcountSchema = require('../schemas/gagcount-schema')
        const gagName = args[0]

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