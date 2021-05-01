const { WebhookClient } = require("discord.js")
const { Command, colors } = require('../utils')
const Discord = require("discord.js");
module.exports = async function onReady() {
    console.log(`Logado.`);
    let s = [
        { name: `🥂 v5.9.4 disponível!.`, type: 'WATCHING', url: 'https://www.youtube.com/watch?v=zWM4qq3MzFE' },
        { name: `🏆 Anda perdido ? me mencione!`, type: 'WATCHING', url: 'https://www.youtube.com/watch?v=qlbAaWq1-fs' },
        { name: `🔑 Entre em contato para reportar qualquer bug encontrado.`, type: 'WATCHING', url: 'http://www.clickjogos.com.br/' },
        { name: `⚜️ Lançamento do novo Sistema VIP!`, type: 'WATCHING', url: 'https://www.twitch.tv/cellbit' },
        { name: `♨️ Os melhores programadores da geração!`, type: 'WATCHING', url: 'https://www.twitch.tv/cellbit' },
        { name: `📣 Uma changelog vasta de atualizações!`, type: 'WATCHING', url: 'https://www.twitch.tv/cellbit' },
        { name: `🎍 Desfrute de uma moderação a nível superior!`, type: 'WATCHING', url: 'https://www.twitch.tv/cellbit' },
        { name: `👩‍🚀 Mais Comandos legais para Você!`, type: 'WATCHING', url: 'https://www.twitch.tv/cellbit' },

        // { name: `Manutenção`, type: 'STREAMING', url: 'https://www.twitch.tv/cellbit' },
        // { name: `Manutenção`, type: 'STREAMING', url: 'https://www.twitch.tv/cellbit' },
        // { name: `Manutenção`, type: 'STREAMING', url: 'https://www.twitch.tv/cellbit' },
        // { name: `Manutenção`, type: 'STREAMING', url: 'https://www.twitch.tv/cellbit' }

    ];

    setInterval(() => {
        let game = s[Math.floor(Math.random() * s.length)]
        this.user.setPresence({ activity: game })
    }, 15000)

    // Essa funcao busca na Db usuarios mutados e tenta remover o cargo deles
    // se ja passou tempo de mute
    const muteCheck = () => {
        const usuariosMutados = this.database.Mutados.find({})
        for (let user = 0; user < usuariosMutados.length; user++) {
            if (usuariosMutados[user].time >= Date.now()) {
                const server = this.guilds.cache.get(usuariosMutados[user].server)
                const userId = usuariosMutados[user]._id
                const channel = this.channels.cache.get(usuariosMutados[user].channel)
                try {
                    server.member(userId).roles
                        .remove(
                            server.roles.cache.find(r => r.name == "Muted Jeth")
                        )
                            .then(() => {
                                channel.send(`Usuario ${this.users.cache.get(userId)} desmutado. <:sing_Jeth:677598304371998819>`)
                                this.database.Mutados.findByIdAndDelete(userId)
                                console.log(`Usuario ${this.users.cache.get(userId).tag} foi desmutado e removido da Db`)
                            })
                }

                catch(err) {
                    console.log(`Algo errado em tentar remover cargo de ${this.users.cache.get(userId)}, ${err}`)
                    this.database.Mutados.findByIdAndDelete(userId)
                }

            }
        }
    }
    setInterval(muteCheck, 30 * 1000)

    // Aqui posta os comandos
    this.api.applications(this.user.id).commands.post({
        data: {
            name: "ping",
            description: "Mostra o ping do bot;"
        }
    })


    this.ws.on("INTERACTION_CREATE", async (interaction) => {
        // Faço os comandos aqui
        const command = interaction.data.name.toLowerCase()
        
        const args = interaction.data.options

        if (command === 'ping') {
            // Infelizmente tem que ter a bosta do if
            this.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 5
                    //data: {
                        // Caso queira um slash que so author possa ver deixe habilitado
                        //flags: 1 << 6
                    //}
                }
            })
            // Responde a menssagem com um inline reply
            return await new WebhookClient(this.user.id, interaction.token).send(`<:2690chart:832746523980201994> ⇝ Ping: ${this.ws.ping}ms`)
        }
    })
    // novo comando
    this.ws.on("INTERACTION_CREATE", async (interaction, message) => {
        // Faço os comandos aqui
        const command = interaction.data.name.toLowerCase()
        
        const args = interaction.data.options

    if (command === '1v1') {
        // Infelizmente tem que ter a bosta do if
        this.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5
                //data: {
                    // Caso queira um slash que so author possa ver deixe habilitado
                    //flags: 1 << 6
                //}
            }
        })
        // Responde a menssagem com um inline reply
        let user = message.mentions.user.first();
        if (!user) return message.reply('`Você não mencionou o usuario que você quer batalhar!`').catch(console.error);
        const v = "<@" + message.author.id + ">"
        const v2 = " <@" + user.id + ">"
        let gifs = ['https://2.bp.blogspot.com/-JvzopHO87T8/V4VKL4PX_GI/AAAAAAAAEWA/-Rx2XKmOT28lElnlMUaOpn22FAuKdJA4wCLcB/s640/tumblr_o49dvpBamW1vont75o1_500.gif', 'https://pa1.narvii.com/6668/62e28e9e256f3003fc4078f5aeaac99aefec1d8e_hq.gif', 'https://media1.tenor.com/images/4bb385101ff94e863ddef445ce2cc732/tenor.gif?itemid=18523359', 'https://media1.tenor.com/images/304bff8e43185ab3dfcd6424bd2be8fd/tenor.gif?itemid=18523137', 'https://pa1.narvii.com/6562/3a7a5cdcf9b84afb206a65a3d99d3d3c11447088_hq.gif', 'https://i.pinimg.com/originals/3c/40/7c/3c407c8f18f779df549c30fa0e56f835.gif', 'https://i.pinimg.com/originals/20/8e/f9/208ef916f5998629b0face475c12e241.gif', 'https://thumbs.gfycat.com/FickleForcefulBlobfish-max-1mb.gif', 'https://media3.giphy.com/media/h3Jxu7a7pd72w/giphy.gif', 'https://data.whicdn.com/images/301514445/original.gif']
        var falas = ['**ganhou** a batalha!', '**foi assassinado** em combate!', '**perdeu** a batalha!']
        var embedB = new Discord.MessageEmbed()
            .setTitle("🏹 | Batalha")
            .setDescription(" O " + v + " e" + v2 + " **estão disputando uma batalha!**")
            .setImage(gifs[Math.floor(Math.random() * gifs.length)])
            .setColor(colors.default)
            .addField("Sobre a batalha:", "O " + v + "\n" + falas[Math.floor(Math.random() * falas.length)] + "\n" + "O " + v2 + "\n" + falas[Math.floor(Math.random() * falas.length)])
            .setTimestamp()
            .setFooter("🧁・Discord da Jeth", message.guild.iconURL({ dynamic: true, size: 1024 }))
        message.channel.send(embedB)
    }
        //fim do comando
    })
}