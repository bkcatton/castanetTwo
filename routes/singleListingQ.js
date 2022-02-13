const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("body", req.body);
    console.log("response", res);
    db.query(
      `SELECT * FROM listings
    WHERE id = 2;`,
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
