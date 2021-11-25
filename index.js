const colors = require('colors')
const fs = require('fs')
const crypto = require('crypto');
const mongoose = require('mongoose')

const { EventEmitter } = require('stream')
const { Client, Intents, MessageEmbed, ButtonInteraction, MessageActionRow, MessageButton } = require('discord.js');
const { Deploy } = require('./Bot/deploy-commands')
const { key } = require('./Bot/token')

require('dotenv').config()


const commands = {};
const commandFiles = fs.readdirSync('./Bot/Commands').filter(file => file.endsWith('.js'));

const readCommands = async () => {
    for (const file of commandFiles) {
        const command = require(`./Bot/Commands/${file}`);
        commands[file.toString().substring(0,file.toString().length-3)] = command.execute
    }
}

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS
    ]
})



function bot() {
    return new Promise((resolve,reject) => {
        client.on('ready', () => {
            readCommands()
            .then(() => {
                resolve()
            })
        })

        client.on('interactionCreate', async (interaction) => {
            if (interaction.isCommand()) {
                if (interaction.commandName in commands) {
                    commands[interaction.commandName](interaction)
                }
            } else if (interaction.isButton()) {
                switch (interaction.customId) {
                    case "primary":
                        await interaction.channel.send("im litteraly doing the most stupid things for this to work")
                        const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId('primary')
                            .setLabel('Click me')
                            .setStyle('DANGER')
                            .setDisabled(true)
                        )
                        await interaction.message.edit({content: interaction.message.content, components: [row]})
                        await interaction.reply("You clicked my button")
                        
                }
            }
            
        })

        client.login(key())
    })
    
}

async function main() {
    await Deploy()
    await bot(process.env.TOKEN)
    console.log("Bot has sucessfuly connected to discord")
}

main()