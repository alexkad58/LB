const mongo = require('./mongo')
const Discord = require('discord.js')
const ffmpeg = require('ffmpeg')
const command = require('./command')
const gagSchema = require('./schemas/gag-schema')

module.exports = (client) => {
    const cache = {}

    command(client, 'прикол', async message => {
        const { member, content, guild } = message

        let text = content

        const split = text.split(' ')

        if (split.length <2) {
            const embed = new Discord.MessageEmbed()
                .setTitle('Приколы')
                .setColor('#FF5733')
                .addFields(
                    {
                        name: 'smeh',
                        value: 'Ржали всем селом.',
                    },
                    {
                        name: 'andrey',
                        value: 'Андрей - няшная юмичка.',
                    },
                    {
                        name: 'ai',
                        value: 'Оргазм Аси в памел пати.',
                    },
                    {
                        name: 'lift',
                        value: 'Все молчат и слышат только одно.',
                    },
                    {
                        name: 'leha',
                        value: 'Звук стила бафа у лесника.',
                    },
                    {
                        name: 'bruh',
                        value: 'Родной брух.',
                    },
                )

            message.channel.send(embed)
            return
        }

        split.shift()
        text = split.join(' ')

        cache[member.id] = [text]

        await mongo().then(async mongoose => {
            try {
                await gagSchema.findOneAndUpdate(
                {
                    _id: member.id
                }, 
                {
                    _id: member.id,
                    text,
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
    })

    client.on('voiceStateUpdate', async (oldMember, newMember)=> {
        

        if(oldMember.selfMute == true && newMember.selfMute == false) {
            const  { guild } = newMember
            let data = cache[newMember.id]
    
            if(!data) {
                console.log('Получение с db')
                await mongo().then(async mongoose => {
                    try {
                        const result = await gagSchema.findOne({ _id: newMember.id })
    
                        cache[newMember.id] = data = [result.text]
                    } finally {
                        mongoose.connection.close()
                    }
                })
            }
    
            const text = data[0]

            if (newMember.channel && text !== 'выкл') {
                newMember.channel.join()
                .then(connection => {
                    connection.play(`audio/${text}.mp3`,{volume: 0.3,});
                });
                console.log(`${newMember.member.user.username} включил прикол ${text}`)
            } 
        }
    })

}