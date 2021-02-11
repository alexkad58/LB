const gagSchema = require("../schemas/gag-schema");

module.exports = async ({ message, args, text, client, prefix, instance, item }) => {
    
    function getUserFromMention(mention) {
        if (!mention) return;
    
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
    
            return client.users.cache.get(mention);
        }
    }
    const mainGuild = client.guilds.cache.get('579709976029691905')
    targetMember = message.mentions.members.first()
    var newstr = text.replace(args[0], '')
    var newstr = newstr.replace(args[1], '')
    if (targetMember && targetMember !== undefined && newstr.length < 32) {
        targetMember.setNickname(newstr)
        message.react('👌')
            const result = await gagSchema.findOne({_id: message.author.id})
            result.inventory[item] = result.inventory[item] - 1
            await gagSchema.findOneAndUpdate({_id: message.author.id}, {inventory: result.inventory})
    } else {
        message.reply(`Используй ${prefix}use ${args[0]} <@юзер> <ник>`)
    }
    
}