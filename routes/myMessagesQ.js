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
      `SELECT DISTINCT ON (sender_id) sender_id, messages.id, receiver_id, message_body, users.name AS sender_name
      FROM messages
      JOIN users ON sender_id = users.id WHERE receiver_id = 3;`
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
