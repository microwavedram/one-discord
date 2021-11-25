const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const password = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

const key = crypto.scryptSync(password, 'https://printer.discord.com/', 32);
const iv = Buffer.alloc(16, 0);

let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

let encrypted = cipher.update(process.env.TOKEN);

encrypted = Buffer.concat([encrypted, cipher.final()]);

console.log(encrypted.toString('hex'))
