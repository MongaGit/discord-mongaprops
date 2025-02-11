const { AttachmentBuilder } = require('discord.js');
const path = require('path');
const config = require('../../config/config.json');

const sendBomdiaMessage = async (client, channelId) => {
    const channel = await client.channels.fetch(channelId);
    if (!channel) return;

    const imagePath = path.join(__dirname, '../../', config.imagePath);
    const attachment = new AttachmentBuilder(imagePath);
    
    // Obtém o ID da role a partir da variável de ambiente
    const roleMention = `<@&${process.env.MONGAPROPS_MONGA_ROLE_ID}>`;
    channel.send({ content: `Bom dia ${roleMention}\n`, files: [attachment] });
};

module.exports = { sendBomdiaMessage };
