require("dotenv").config();
const express = require("express");
const router = express.Router();
const {sendText} = require('../public/scripts/sms')

module.exports = (db) => {
  router.get("/", (req, res) => {
    //console.log("before the function call", req.query.message);
    const messageBody = req.query.message;
    const buyerNumber = req.query.buyer_number;
    const currentListing = req.query.currentListing;
    console.log("from the backend query", currentListing);

    sendText('+12506811829', `${messageBody}`);

    // db.query(
    //   `SELECT * FROM users;`,
    //   [req.query.id]
    // )
    //   .then((data) => {
    //     const listing = data.rows;
    //     res.json({ listing });
    //     console.log("user id", req.session.user_id);

    //     console.table("this is the listign", listing);
    //   })
    //   .catch((err) => {
    //     res.status(500).json({ error: err.message });
    //   });

  });
  return router;
};
