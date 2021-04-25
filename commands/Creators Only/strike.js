const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class strike extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = []
        this.category = 'Only Devs'
        this.adminOnly = false
    }

    async run(message, args) {
        let staff = await this.client.database.Users.findById(message.author.id)
        if (!staff.staff) {
            return message.channel.send('Você não pode utilizar este comando, somente os membros confiados da equipe <@&718178715426619489>')
        }
        switch (args[0]) {
            case "add": {
                let user = await this.client.users.fetch(args[1])
                let userDB = await this.client.database.Users.findById(user.id)
                const strike = new MessageEmbed()

                    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
                    .setTitle('Segurança | Strike')
                    .setColor('#6353f8')
                    .setDescription(`\n<:Kaeltec:673592197177933864> **Staff:** ${message.author.username} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Infrator:** ${user.username} \n**ID:** ${user.id}`)
                    .setImage(`https://i.imgur.com/agmg3jg.png`)
                    .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
                    .setTimestamp(new Date());
                userDB.strike += 1
                userDB.save().then(() => message.channel.send(strike))
                if (userDB.strike >= 3) {
                    userDB.blacklist = true
                    userDB.blacklistReason = "[STRIKE EXCEDIDO] - Quebra dos termos de uso do Discord."
                    userDB.save().then(() => message.channel.send(`O usuário \`${user.tag}\` foi adicionado da blacklist.`))
                }
                message.channel.send(`O usuário \`${user.tag}\` acabou levando strike (${userDB.strike}))`)
            }
                break
            case "remove": {
                let user = await this.client.users.fetch(args[1])
                let userDB = await this.client.database.Users.findById(user.id)
                message.channel.send(`${user} Teve seu strike removido! <:a_blobnomstaff:754934349295779912>`)
                userDB.strike -= 1
                userDB.save()
                if (userDB.strike < 3) {
                    userDB.blacklist = false
                    userDB.blacklistReason = null
                    userDB.save().then(() => message.channel.send(`O usuário \`${user.tag}\` foi removido da blacklist.`))
                }
                message.channel.send(`O usuário \`${user.tag}\` teve 1 strike removido (${userDB.strike})`)
            }
                break
            default: {
                message.channel.send("Você não informou a opção e o ID do usuário que deseja dar strike.")
            }
        }
    }
}