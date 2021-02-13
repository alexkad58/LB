const mongo = require('../../mongo')
const gagSchema = require('../../schemas/gag-schema')
const storeItems = require('./store-items.json')

module.exports = {
    name: 'Имба', // Optional
    commands: ['additem'], // Optional
    aliases: ['ai'], // Optional
    minArgs: 3,
    maxArgs: 3,
    ownerOnly: true,
    expectedArgs: '<юзер> <предмет> <кол-во>',
    cooldown: '10s',
    category: 'Магазин',
    description: 'Имба',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const mainGuild = client.guilds.cache.get('579709976029691905')
        const logChannel = mainGuild.channels.cache.get('807116096586252289')
        const logMessage = `>${message.author.username}(${message.guild.member(message.author).nickname}) покупает "${args[1]}"`
        logChannel.send(logMessage)
        const target = message.mentions.members.first();
        const reqItem = args[1]
        const amount = parseInt(args[2], 10)
            if (typeof storeItems[`${reqItem}`] !== "undefined") {
                const itemName = storeItems[reqItem].name
                if (!target) {
                  return
                }
                await mongo().then(async mongoose => {
                    try {  
                        const result = await gagSchema.findOne({_id: target.id})
                        if (!result) {
                            return
                        }
                            message.react('👌')
                            if (!result.inventory) {
                                result.inventory = {}
                            } 
                            if (!result.inventory[`${reqItem}`]) {
                                result.inventory[`${reqItem}`] = amount
                            } else {
                                result.inventory[`${reqItem}`] = result.inventory[`${reqItem}`] + amount
                            }      
                            await gagSchema.findOneAndUpdate({_id: target.id}, {
                                _id: target.id,
                                inventory: result.inventory
                            },{upsert: true})
                        
                    } finally {
                        mongoose.connection.close()
                    }
                })
                }else{
                    message.reply(`Предмета "**${reqItem}**" нет в моем магазине.`)
                }
    }
}