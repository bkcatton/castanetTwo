require("dotenv").config();
const express = require("express");
const router = express.Router();
// const { sendText } = require("../public/scripts/sms");
// const http = require('http');
//     const MessagingResponse = require('twilio').twiml.MessagingResponse;

//     const app = express();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `select messages.id, sender_id, receiver_id, message_body, users.name AS sender_name
      from messages
      JOIN users ON sender_id = users.id
      where (sender_id = $1 AND receiver_id = 3) OR (sender_id = 3 AND receiver_id = $1);`,[req.query.id]
    )
      .then((data) => {
        res.json({ data: data.rows });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
