require("dotenv").config();
const express = require("express");
const router = express.Router();
const { sendText } = require("../public/scripts/sms");
const http = require('http');
    const MessagingResponse = require('twilio').twiml.MessagingResponse;

    const app = express();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT * FROM messages;`
    )
      .then((data) => {
        res.json({ data: data.rows });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    console.log(req.body.Body);
    console.log(req.session.user_id);

  //   db.query(
  //     `INSERT INTO messages(sender_id, receiver_id, message_body) VALUES ();`, [req.body.From, req.body.Body, req.body.To]
  //   )
  //     .then((data) => {
  //       res.json({ data: data.rows });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });
    const twiml = new MessagingResponse();

    twiml.message('The Robots are coming! Head for the hills!');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });

  http.createServer(app).listen(1337, () => {
    console.log('Express server listening on port 1337');
  });

  return router;
};
