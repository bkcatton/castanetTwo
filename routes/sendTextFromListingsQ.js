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
    console.log("from the backend query", currentListing);

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

    db.query(
      `INSERT INTO messages (id, message_body,receiver_id, sender_id)
      VALUES (nextval('id_sequence'), $1, 3, 10) RETURNING *;`,
      [messageBody]
    )
      .then((data) => {
        console.log("the data it should be", data.rows);

        console.log("added  to msgs");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
