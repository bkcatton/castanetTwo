const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT * FROM listings
    WHERE id = 1;`
    )
      .then((data) => {
        const listing = data.rows;
        res.json({ listing });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
