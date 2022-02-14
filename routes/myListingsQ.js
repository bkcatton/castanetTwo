const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT *
              FROM listings
              WHERE listings.seller_id = $1;`,
      [req.session.user_id]
    )
      .then((data) => {
        const myListings = data.rows;
        // console.log("data", data);
        // console.log("mylistings", myListings);
        res.json({ myListings });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/", (req, res) => {
    db.query(`DELETE FROM listings WHERE listings.id = $1 RETURNING *`, [
      req.body.id,
    ])
      .then((data) => {
        res.redirect("/myListings");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
