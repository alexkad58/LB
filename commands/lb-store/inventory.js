const mongo = require('../../mongo')
const gagSchema = require('../../schemas/gag-schema')
const storeItems = require('./store-items.json')
const Discord = require('discord.js')
const gagcountSchema = require('../../schemas/gagcount-schema')
const workers = require('../../itemsCode/workers.json')

module.exports = {
    name: 'Инвентарь', // Optional
    commands: ['inv', 'i'], // Optional
    aliases: ['i'], // Optional
    cooldown: '10s',
    category: 'Магазин',
    description: 'Посмотреть свой инвентарь',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        function getNN() {
            if(!message.guild.member(message.author).nickname) {
                return (message.author.username)
            } else {
                return (message.guild.member(message.author).nickname)
            }
        }
        const mainGuild = client.guilds.cache.get('579709976029691905')
        const logChannel = mainGuild.channels.cache.get('807116096586252289')
        const logMessage = `>**${getNN()}** посмотрел свой инвентарь`
        logChannel.send(logMessage)
        const embed = new Discord.MessageEmbed()
        .setTitle(`Инвентарь - ${getNN()}`)
        .setColor('#FF5733')
            await mongo().then(async mongoose => {
                try {  
                        const result = await gagSchema.findOne({_id: message.author.id})
                        if (!result || !result.inventory || Object.keys(result.inventory).length < 1) {
                            message.reply(`Твой инвентарь пуст.`)
                            return
                        }
                        let is = false
                        let k = 0
                        for(var item in result.inventory) {
                            k ++
                            if (!storeItems[item]) {
                                if(workers[item] && result.inventory[item] > 0) {
                                    const itemName = workers[item].name
                                    embed.addField(
                                    `**${itemName}** - ${result.inventory[`${item}`]}`,
                                    `Описание: ${workers.itemDescription} \n ${prefix}test ${item}`
                                    )
                                }
                                
                            } else {
                            if (result.inventory[item] < 1 && Object.keys(result.inventory).length == k && is == false) {
                                message.reply(`Твой инвентарь пуст.`) 
                                return
                            }
                            if (!result.inventory[item] < 1) {
                            is = true
                            const itemName = storeItems[item].name
                            const itemDescription = storeItems[item].description
                            embed.addField(
                                `**${itemName}** - ${result.inventory[`${item}`]}`,
                                `Описание: ${itemDescription} \n ${prefix}use ${item} <юзер>`
                            )}
                        }}
                        message.reply(embed)
                    } finally {
                        mongoose.connection.close()
                    }
                })
    }
}