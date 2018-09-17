const API_AI_TOKEN = '152ac5af65f842d58772f327beea0e14';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAACZCZC278ONYBAPCo7YDWHVElhT0weQTEcTCzGTpD5yLiZC09Enr8W7ACaNzriDm9dRzHNgVXTL9LGn5R3ZAKOjeFyddGrKcwIxCQXb5kD7jLHkbNWH9MZBSQ2xk7glfvoS6zuF25kqOojyxsy5iFbb7KixbcPQky8vzZCWpK0AZDZD';
const request = require('request');
const sendTextMessage = (senderId, text) => {
 request({
 url: 'https://graph.facebook.com/v2.6/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: 'POST',
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};
module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;
const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};