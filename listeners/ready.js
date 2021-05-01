const { WebhookClient } = require("discord.js")
const { Command, TranslateFunctions, colors } = require('../utils')
const { MessageEmbed } = require('discord.js')
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


    this.ws.on("INTERACTION_CREATE", async (interaction, message) => {
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
        if (command === 'contador') {
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
            await new WebhookClient(this.user.id, interaction.token)
            Command.send('../commands/AnimatedCounter/contador.js') 
            }
       })
    }
        