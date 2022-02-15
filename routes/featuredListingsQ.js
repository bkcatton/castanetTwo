const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM listings;`)
      .then((data) => {
        const listings = data.rows;
        res.json({ listings });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/", (req, res) => {
    console.log("the data coming through", req.body.id, req.session.user_id);
    db.query(
      `INSERT INTO favorites(id,listing_id,user_id)
    VALUES(nextval('id_sequence'),$1,$2)`,
      [req.body.id, req.session.user_id]
    )
      .then((data) => {
        console.log("added to faves?");
        // res.redirect("/myListings");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
