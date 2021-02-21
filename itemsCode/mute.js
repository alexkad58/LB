const gagSchema = require("../schemas/gag-schema");
const cache = {}
const delay = 1000 * 60

module.exports = async ({ message, args, prefix, item }) => {

    // message.react('🚫')
    // return
    
    targetMember = message.mentions.members.first();
    if (targetMember || targetMember !== undefined) {
        cache[Date.now().toString().slice(0, -3)] = targetMember
        targetMember.voice.setMute(true)
        message.react('👌')
        setTimeout(() => {
            targetMember = cache[Date.now().toString().slice(0, -3) - delay.toString().slice(0, -3)]
            targetMember.voice.setMute(false)
        }, delay)
            const result = await gagSchema.findOne({_id: message.author.id})
            result.inventory[item] = result.inventory[item] - 1
            await gagSchema.findOneAndUpdate({_id: message.author.id}, {inventory: result.inventory})
    } else {
        message.reply(`Используй ${prefix}use ${args[0]} <@юзер>`)
    }
   
}