require("dotenv").config();
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

const sendText = function (send_to) {
    client.messages
      .create({
        to: send_to,
        from: '+18126132228',
        body: 'TEST from our app',
      })
      .then(message => console.log(message.sid))
      .done();
};

module.exports = {sendText}
