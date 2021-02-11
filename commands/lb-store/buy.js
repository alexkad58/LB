const mongo = require('../../mongo')
const gagSchema = require('../../schemas/gag-schema')
const storeItems = require('./store-items.json')

module.exports = {
    name: 'Покупка', // Optional
    commands: ['buy', 'b'], // Optional
    aliases: ['b'], // Optional
    minArgs: 1,
    maxArgs: 2,
    expectedArgs: '<предмет> <кол-во>',
    cooldown: '10s',
    category: 'Магазин',
    description: 'Купить предмет',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const mainGuild = client.guilds.cache.get('579709976029691905')
        const logChannel = mainGuild.channels.cache.get('807116096586252289')
        const logMessage = `>${message.author.username}(${message.guild.member(message.author).nickname}) покупает "${args[0]}"`
        logChannel.send(logMessage)
        const reqItem = args[0]
            if (typeof storeItems[`${reqItem}`] !== "undefined") {
                const itemName = storeItems[reqItem].name
                const itemCost = storeItems[reqItem].cost
                function amnt () {
                    if (args[1] === undefined) {
                        const itemAmount = 1
                        return itemAmount
                    } else {
                        let itemAmountParsed = parseInt(args[1], 10)
                        if (itemAmountParsed != itemAmountParsed) {
                            const itemAmount = 1
                            return itemAmount
                        } else {
                            const itemAmount = itemAmountParsed
                            return itemAmount
                        }
                    }
                }
                await mongo().then(async mongoose => {
                    try {  
                        const result = await gagSchema.findOne({_id: message.author.id})
                        if (!result) {
                            return
                        }
                        if (result.count < itemCost * amnt()) {
                            message.reply('Недостаточно приколов на счету.')
                        } else {
                            message.reply(`Ты купил **${amnt()}** "**${itemName}**"`)
                            if (!result.inventory) {
                                result.inventory = {}
                            } 
                            if (!result.inventory[`${reqItem}`]) {
                                result.inventory[`${reqItem}`] = amnt()
                            } else {
                                result.inventory[`${reqItem}`] = result.inventory[`${reqItem}`] + amnt()
                            }      
                            await gagSchema.findOneAndUpdate({_id: message.author.id}, {
                                _id: message.author.id,
                                count: result.count - (itemCost * amnt()),
                                inventory: result.inventory
                            },{upsert: true})
                        }
                    } finally {
                        mongoose.connection.close()
                    }
                })
                }else{
                    message.reply(`Предмета "**${reqItem}**" нет в моем магазине.`)
                }
    }
}