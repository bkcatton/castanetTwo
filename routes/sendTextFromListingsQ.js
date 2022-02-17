require("dotenv").config();
const express = require("express");
const router = express.Router();
const { sendText } = require("../public/scripts/sms");

module.exports = (db) => {
  router.get("/", (req, res) => {
    //console.log("before the function call", req.query.message);
    const messageBody = req.query.message;
    const buyerNumber = req.query.buyer_number;
    const buyerName = req.query.buyer_name;
    const currentListing = req.query.currentListing;
    console.log("from the backend query", buyerName, buyerNumber);

    // sendText("+12506811829", `${messageBody}`);
    // console.log(
    //   "body",
    //   messageBody,
    //   "buyer number",
    //   buyerNumber,
    //   "cur listing",
    //   currentListing
    // );

    //1. add the user to the database from the single_listing form.
    //2. get that user id and add the message to the database with that user id and the user id that
    //owns the listing the text was sent from
console.log("inside the sendTFromLQ", req.query);

    db.query(
      `INSERT INTO users (id, name, phone_number, is_admin)
      VALUES (nextval('id_sequence'), $1, $2, false) RETURNING *;`,
      [buyerName, buyerNumber]
    )
      .then((data) => {
        //console.log("the users id from adding into table", data.rows[0].id);
        db.query(
          `INSERT INTO messages (id, sender_id, receiver_id, message_body,)
          VALUES (nextval('id_sequence'), $1, $2, $3) RETURNING *;`,
          [data.rows[0].id, currentListing, messageBody]
        )
        console.log("added to users");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });

  });
  return router;
};
