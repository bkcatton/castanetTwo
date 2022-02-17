require("dotenv").config();
const express = require("express");
const router = express.Router();
const { sendText } = require("../public/scripts/sms");
const http = require('http');
    const MessagingResponse = require('twilio').twiml.MessagingResponse;

    const app = express();

module.exports = (db) => {
  router.post('/', (req, res) => {
    const messageBody = req.body.Body;
    const sendTo = +req.body.To.slice(1);
    const sendFrom = +req.body.From.slice(1);
    console.log("inside the post", messageBody, typeof sendTo, typeof sendFrom);

    //1. add the user to the database from the single_listing form.
    //2. get that user id and add the message to the database with that user id and the user id that
    //owns the listing the text was sent from

    //adds text message to database. passes in message body, hard codes sender and receiver id
    db.query(
      `INSERT INTO messages(id, sender_id, receiver_id, message_body)
       VALUES (nextval('messages_sequence'), 7, 3, $1) RETURNING *;`, [messageBody]
      )
      .then((data) => {
        //res.json({ data: data.rows });
        res.writeHead(200, {'Content-Type': 'text/xml'});
        console.log("did the text get added to the table?");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });

    const twiml = new MessagingResponse();

    //twiml.message('The Robots are coming! Head for the hills!');

    //res.writeHead(200, {'Content-Type': 'text/xml'});
   // res.end(twiml.toString());


  // http.createServer(app).listen(1337, () => {
  //   console.log('Express server listening on port 1337');
  //});
});
  return router;
};
