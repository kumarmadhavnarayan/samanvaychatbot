const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, () => console.log('Webhook server is listening, port port'));
const verificationController=require('./Controllers/verification');
const messageWebhookController = require('./Helpers/messageWebhook');
app.get('/', verificationController);
app.post('/', messageWebhookController);
