//database query to api/favorites
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT * FROM favorites
      JOIN listings ON listings.id = listing_id
    WHERE user_id = $1;`, [req.session.user_id]
    ) //change query to show favorites
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
