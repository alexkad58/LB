const mongo = require('../../mongo')
const gagSchema = require('../../schemas/gag-schema')
const welcomeSchema = require('../../schemas/welcome-schema')
const workers = require('../../itemsCode/workers.json')
const { Message } = require('discord.js')

module.exports = {
    name: 'Работа', 
    commands: ['work', 'w'],
    category: 'Шахта',
    description: 'Отправляет рабочего в шахту',
    minArgs: 1,
    expectedArgs: '<тир рабочего>',
    callback: async ({ message, args, client }) => {

        await mongo()

        

        let reqWorker
        switch (args[0].toLowerCase()) {
            case ('s'): reqWorker = 'workerTier1'; break
            case ('a'): reqWorker = 'workerTier2'; break
            case ('b'): reqWorker = 'workerTier3'; break
            case ('c'): reqWorker = 'workerTier4'; break
            case ('d'): reqWorker = 'workerTier5'; break
            default: return message.reply('Доступные рабочие: S, A, B, C, D')
        }

        let workersQueue = [] // [ [ [ guild.id, channel.id, msg.id ], tier, id ] ]
        let mineChannel

        // Есть канал шахты

        mineFetched = await welcomeSchema.findOne({ _id: message.guild.id })
        if (mineFetched) {
            if(mineFetched.mineChannelId) {
                mineChannel = message.guild.channels.cache.get(mineFetched.mineChannelId)
            } else {
                return message.reply('На этом сервере нет шахты, обратитесь к администрации')
            }
        } else {
            return message.reply('На этом сервере нет шахты, обратитесь к администрации')
        }

        // Дуступны рабочие
            // Есть рабочие в инвенторе
            // Есть незанятые рабочие (кэш)
        
        const result = await gagSchema.findOne({ _id: message.author.id })
        if (result.inventory[reqWorker] && result.inventory[reqWorker] > 0) { 
            msg = await mineChannel.send(`**${workers[reqWorker].name}** начал работу на ${message.author}`, {files: [workers[reqWorker].img]})
            workersQueue.push([ [msg.guild.id, msg.channel.id, msg.id ], reqWorker, message.author.id ])
            result.inventory[reqWorker]--
            await gagSchema.findOneAndUpdate({_id: message.author.id}, {
                _id: message.author.id,
                inventory: result.inventory
            },{upsert: true})
            
            console.log(result.inventory[reqWorker])
            setTimeout(async () => {
                let res = await gagSchema.findOne({ _id: workersQueue[0][2] })
                    if (Math.random() * 100 < workers[workersQueue[0][1]].deathChance) {
                        
                        client.guilds.cache.get(workersQueue[0][0][0]).channels.cache.get(workersQueue[0][0][1]).messages.cache.get(workersQueue[0][0][2]).edit(`${client.users.cache.get(workersQueue[0][2])}, твой **${workers[workersQueue[0][1]].name}** умер :(`)
                    } else {
                        res.inventory[workersQueue[0][1]]++
                        await gagSchema.findOneAndUpdate({ _id: workersQueue[0][2] }, {
                            _id: workersQueue[0][2],
                            count: res.count + workers[workersQueue[0][1]].efficiency,
                            inventory: res.inventory
                        }, { upsert: true }) 
                        client.guilds.cache.get(workersQueue[0][0][0]).channels.cache.get(workersQueue[0][0][1]).messages.cache.get(workersQueue[0][0][2]).edit(`**${workers[workersQueue[0][1]].name}** заработал для ${client.users.cache.get(workersQueue[0][2])} *${workers[workersQueue[0][1]].efficiency}* приколов`)
                    }
                workersQueue.shift()
            }, 1000 * 60 * 2.5)
        }
        else { 
            message.reply('У тебя нет рабочих этого тира или они все заняты')
            return 
        }
    }
}