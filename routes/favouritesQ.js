//database query to api/favourites
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT title, price FROM favorites
      JOIN listings ON listings.id = listing_id
    WHERE user_id = 4;`
    ) //change query to show favourites
      .then((data) => {
        const favorites = data.rows;
        res.json({ favorites });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
