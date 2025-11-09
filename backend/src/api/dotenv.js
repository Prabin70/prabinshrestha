const { config } = require("dotenv");

config();

const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;
const smtpHost = process.env.SMTP_HOST;
const appPassword = process.env.APP_PASSWORD;
const allowedUrl = process.env.DEPLOYED_LINK;

module.exports = { mongoUri, port, smtpHost, appPassword, allowedUrl };
