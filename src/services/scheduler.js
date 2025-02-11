const schedule = require('node-schedule');
const { sendBomdiaMessage } = require('../commands/bomdia');
require('dotenv').config();

const initializeScheduler = (client, testMode = false) => {
    // Se estiver em modo de teste, envia a mensagem imediatamente
    if (testMode) {
        console.log('Modo de teste: enviando mensagem imediatamente...');
        sendBomdiaMessage(client, process.env.MONGAPROPS_CHANNEL_ID);
    }

    // Configura o fuso horário de São Paulo (GMT-3)
    const rule = new schedule.RecurrenceRule();
    rule.tz = 'America/Sao_Paulo';
    rule.hour = 6;
    rule.minute = 0;

    // Agenda a tarefa para executar todos os dias às 6h
    schedule.scheduleJob(rule, async () => {
        try {
            await sendBomdiaMessage(client, process.env.MONGAPROPS_CHANNEL_ID);
            console.log('Mensagem de bom dia enviada com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar mensagem de bom dia:', error);
        }
    });

    console.log('Scheduler inicializado com sucesso!');
};

module.exports = { initializeScheduler };
