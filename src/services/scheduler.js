const { sendBomdiaMessage } = require('../commands/bomdia');
const moment = require('moment-timezone');
const config = require('../../config/config.json');
require('dotenv').config();

const scheduleDailyJob = (client, hour, minute, timezone) => {
  const now = moment.tz(timezone);
  let next = moment.tz(timezone).hour(hour).minute(minute).second(0);
  
  // Se o horário já passou hoje, agenda para amanhã.
  if (now.isAfter(next)) {
    next.add(1, 'day');
  }
  
  const delay = next.diff(now);
  console.log(`Agendando o envio para ${next.format()} (${Math.round(delay / 1000)} segundos de espera)`);

  setTimeout(() => {
    // Executa a tarefa e agenda para os próximos dias
    doJob(client);
    // Agenda a cada 24 horas (86.400.000 ms)
    setInterval(() => doJob(client), 24 * 60 * 60 * 1000);
  }, delay);
};

const doJob = async (client) => {
  try {
    // Usando channelId diretamente .env MONGAPROPS_CHANNEL_ID
    await sendBomdiaMessage(client, process.env.MONGAPROPS_CHANNEL_ID);
    console.log('Mensagem de bom dia enviada com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar mensagem de bom dia:', error);
  }
};

const initializeScheduler = (client, testMode = false) => {
  if (testMode) {
    console.log('Modo de teste: enviando mensagem imediatamente...');
    doJob(client);
  }
  
  // Extrai o horário e fuso horário do config.json
  const [hour, minute] = config.scheduler.time.split(':').map(Number);
  const timezone = config.scheduler.timezone;
  
  scheduleDailyJob(client, hour, minute, timezone);
  console.log('Scheduler inicializado com sucesso!');
};

module.exports = { initializeScheduler };
