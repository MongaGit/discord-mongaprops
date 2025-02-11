const { Client, GatewayIntentBits } = require('discord.js');
const { initializeScheduler } = require('../services/scheduler');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

client.once('ready', () => {
    console.log(`Bot está online como ${client.user.tag}`);
    // Verifica se está em modo de teste
    const testMode = process.env.MONGAPROPS_TEST_MODE === 'true';
    initializeScheduler(client, testMode);
});

// Usa a nova variável de ambiente para o token
client.login(process.env.MONGAPROPS_DISCORD_TOKEN);
