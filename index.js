const colors = require('colors')
const fs = require('fs')
const crypto = require('crypto');
const mongoose = require('mongoose')

const { EventEmitter } = require('stream')
const { Client, Intents, MessageEmbed } = require('discord.js');

require('dotenv').config()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS
    ]
})

function key(password, salt) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', crypto.scryptSync(password, salt, 32), Buffer.alloc(16, 0));
    let decrypted = decipher.update(process.env.TOKEN, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted
}

function bot() {
    return new Promise((resolve,reject) => {
        client.on('ready', () => {
            resolve()
        })

        client.login(key(process.env.PASSWORD, process.env.SALT))
    })
    
}

async function main() {
    await bot(process.env.TOKEN)
    console.log("Bot has sucessfuly connected to discord")
}

main()