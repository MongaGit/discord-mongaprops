const { AttachmentBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');
const config = require('../../config/config.json');

const sendBomdiaMessage = async (client, channelId) => {
    const channel = await client.channels.fetch(channelId);
    if (!channel) return;

    // Resolve o caminho da imagem de forma multiplataforma
    const imagePath = path.join(process.cwd(), config.imagePath);
    
    // Verifica se o arquivo existe antes de tentar enviá-lo
    try {
        await fs.promises.access(imagePath);
        const attachment = new AttachmentBuilder(imagePath);
        
        // Obtém o ID da role a partir da variável de ambiente
        const roleMention = `<@&${process.env.MONGAPROPS_MONGA_ROLE_ID}>`;
        await channel.send({ content: `Bom dia ${roleMention}\n`, files: [attachment] });
        console.log(`Imagem enviada com sucesso: ${imagePath}`);
    } catch (error) {
        console.error(`Erro ao acessar a imagem: ${imagePath}`);
        console.error(`Detalhes do erro: ${error.message}`);
        throw error;
    }
};

module.exports = { sendBomdiaMessage };
