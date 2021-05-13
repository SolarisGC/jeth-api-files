const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class emoji extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['emojis']
        this.category = 'Miscellaneous'
    }
    async run(i, message, args) {
        const charactersPerMessage = 2000;
        const emojis = message.channel.guild.emojis.cache.map((e) => `${e} **-** \`:${e.name}:\``).join(', ');
        const numberOfMessages = Math.ceil(emojis.length / charactersPerMessage);
        const embed = new MessageEmbed().setTitle(`Emoji List`);
        for (i = 0; i < numberOfMessages; i++) {
         message.channel.send(
          embed.setDescription(
           emojis.slice(i * charactersPerMessage, (i + 1) * charactersPerMessage)
          )
         );
        }
       }
}