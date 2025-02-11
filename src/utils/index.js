function logMessage(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
}

function formatMessage(content) {
    return content.trim();
}

module.exports = {
    logMessage,
    formatMessage
};