const storeItems = require('./store-items.json')
const Discord = require('discord.js')

module.exports = {
    name: 'Магазин', // Optional
    commands: ['store', 's'], // Optional
    aliases: ['s'], // Optional
    cooldown: '10s',
    category: 'Магазин',
    description: 'Открыть магазин',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const mainGuild = client.guilds.cache.get('579709976029691905')
        const logChannel = mainGuild.channels.cache.get('807116096586252289')
        const logMessage = `>${message.author.username}(${message.guild.member(message.author).nickname}) открыл магазин`
        logChannel.send(logMessage)
        const embed = new Discord.MessageEmbed()
        .setTitle('Магазин')
        .setColor('#FF5733')
        for(var item in storeItems) {
            const itemName = storeItems[item].name
            const itemCost = storeItems[item].cost
            const itemDescription = storeItems[item].description
            embed.addField(
                `**${itemName}**`,
                `Цена: **${itemCost}** \n Описание: ${itemDescription} \n ${prefix}buy ${item} [кол-во]`
            )
        }
        message.reply(embed)
    }
}