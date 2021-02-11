const mongo = require('../../mongo')
const gagSchema = require('../../schemas/gag-schema')
const storeItems = require('./store-items.json')
const Discord = require('discord.js')

module.exports = {
    name: 'Использование предмета', // Optional
    commands: ['use'], // Optional
    aliases: ['use'], // Optional
    minArgs: 1,
    expectedArgs: '<предмет>',
    cooldown: '10s',
    category: 'Магазин',
    description: 'Позволяет использовать предмет',
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
        await mongo().then(async mongoose => {
            try {  
                    const result = await gagSchema.findOne({_id: message.author.id})
                    if (!result || !result.inventory || Object.keys(result.inventory).length < 1) {
                        message.reply(`У тебя нет этого предмета.`)
                        return
                    }
                    const item = args[0]
                    if (!storeItems[item]) {
                        } else {
                        if (result.inventory[item] < 1) {
                            message.reply(`У тебя нет предмета **"${storeItems[item].name}"**.`) 
                            return
                        }
                    }
                    const itemUsage = require(`../../itemsCode/${args[0]}.js`)
                    itemUsage({ message, args, text, client, prefix, instance, item })
                } finally {
                    
                }
            })   
    }
}