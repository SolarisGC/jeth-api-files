const { Command, colors } = require('../../utils')
const { MessageEmbed } = require("discord.js");

module.exports = class Ajuda extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['ajudante', 'help', 'comandos']
        this.category = 'Miscellaneous'
        this.subcommandsOnly = false
    }

    async run(message, args) {
        let documento = await this.client.database.Guilds.findById(message.guild.id)
        let prefix = documento.prefix
        
        const embed = new MessageEmbed()
        embed.setAuthor(`${this.client.user.username} | Ajuda`, this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        embed.setDescription(`**Criamos uma guia de ajuda para você: ${message.author}**`)
        embed.setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
        embed.setColor(colors.default)
        embed.addField(`${("Animated Counter")} (${this.getCommmandSize("Animated Counter")})`, this.getCategory("Animated Counter", prefix))
        embed.addField(`${("Entertainment")} (${this.getCommmandSize("Entertainment")})`, this.getCategory("Entertainment", prefix))
        embed.addField(`${("Miscellaneous")} (${this.getCommmandSize("Miscellaneous")})`, this.getCategory("Miscellaneous", prefix))
        embed.addField(`${("Moderation")} (${this.getCommmandSize("Moderation")})`, this.getCategory("Moderation", prefix))
        embed.addField(`${("Creators Only")} (${this.getCommmandSize("Creators Only")})`, this.getCategory("Creators Only", prefix))
        embed.addField(`${("Registration")} (${this.getCommmandSize("Registration")})`, this.getCategory("Registration", prefix))
        embed.addField(`${("Server Security")} (${this.getCommmandSize("Server Security")})`, this.getCategory("Server Security", prefix))
        embed.addField(`${("Social Commands")} (${this.getCommmandSize("Social Commands")})`, this.getCategory("Social Commands", prefix))
        embed.addField(`${("Vip Commands")} (${this.getCommmandSize("Vip Commands")})`, this.getCategory("Vip Commands", prefix))
        
        message.channel.send(`${message.author} Não se esqueça de votar em mim! <:7875_christmaspog:828828587926093924>`, embed)
        .catch(() => {
            message.reply("<a:rb_mod:759648839417200661> Erro, verifique se eu consigo te enviar mensagens no privado!")
        })
    }
    getCategory(category, prefix) {
        return this.client.commands.filter(c => c.category === category).map(c => `\`${prefix}${c.name}\``).join(", ")
    }

    getCommmandSize(category) {
        return this.client.commands.filter(c => c.category === category).size
    }
    
}
