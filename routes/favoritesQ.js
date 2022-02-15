//database query to api/favorites
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT * FROM listings
      JOIN favorites ON listings.id = listing_id
        WHERE user_id = $1;`,
      [req.session.user_id]
    ) //change query to show favorites
      .then((data) => {
        const favorites = data.rows;
        res.json({ favorites });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/", (req, res) => {
    console.log("the data coming through", req.body.id, req.session.user_id);
    const listing_id = req.body.id;
    const user_id = req.session.user_id;

    db.query(
      `DELETE FROM favorites WHERE
      listing_id = $1
      AND user_id = $2
      RETURNING *
      `,
      [listing_id, user_id]
    )
      .then((data) => {
        console.log("deleted from faves?");
        res.redirect("/");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
