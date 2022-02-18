require("dotenv").config();
const express = require("express");
const router = express.Router();
const { sendText } = require("../public/scripts/sms");

module.exports = (db) => {
  router.get("/", (req, res) => {
    //console.log("before the function call", req.query.message);
    const messageBody = req.query.message;
    const buyerNumber = req.query.buyer_number;
    const currentListing = req.query.currentListing;


    sendText("+12506811829", `${messageBody}`);
    console.log(
      "body",
      messageBody,
      "buyer number",
      buyerNumber,
      "cur listing",
      currentListing
    );

    // db.query(
    //   `INSERT INTO users (id, name, phone_number, is_admin)
    //   VALUES (nextval('id_sequence'), ) RETURNING *;`,
    //   [messageBody, currentListing]
    // )
    //   .then((data) => {
    //     console.log("the data it should be", data.rows);

    //     console.log("added  to msgs");
    //   })
    //   .catch((err) => {
    //     res.status(500).json({ error: err.message });
    //   });

    //from the message center:
    const messageReceiver = req.query.receiver_id;
    //change non dependant queries into promise.all
    db.query(
      `INSERT INTO messages (id, message_body,receiver_id, sender_id)
      VALUES (nextval('id_sequence'), $1, $2, 3) RETURNING *;`,
      [messageBody, messageReceiver])
      .then((data) => {
        console.log("added  to msgs");
        db.query(
          `select * from messages where (sender_id = $1 AND receiver_id = 3) OR (sender_id = 3 AND receiver_id = $1);`, [messageReceiver])
          .then((data) => {
            res.json({ data: data.rows });
          })
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
//instead of clearing containiner, just append new message - will clean up queries


  });
  return router;
};
