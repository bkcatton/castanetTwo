const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("inside SL query", req.query);
    db.query(
      `SELECT * FROM listings
    WHERE id = $1;`,[req.query.id]
    )
      .then((data) => {
        const listing = data.rows;
        res.json({ listing });
        console.log("this is the listign", listing);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
