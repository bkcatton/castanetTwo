require("dotenv").config();
const express = require("express");
const router = express.Router();
const {sendText} = require('../public/scripts/sms')

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("inside Send Text query/path", req.query);
    sendText('+12506811829');
    // db.query(
    //   `SELECT * FROM listings
    // WHERE id = $1;`,
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
