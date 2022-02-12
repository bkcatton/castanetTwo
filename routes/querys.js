const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/bycity", (req, res) => {
    db.query(
      `SELECT title FROM listings
    WHERE city = '$1'
    AND price <= $2;`,
      [$1, $2]
    )
      .then((data) => {
        // console.log(data);
        const templateVars = data.rows;
        res.render("listings", { templateVars });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/favorite", (req, res) => {
    db.query(
      `select * from listings
      join favorites on listings.id = listing_id
      join users on users.id = user_id
      where users.id = $1;`,
      [$1]
    )
      .then((data) => {
        // console.log(data);
        const templateVars = data.rows;
        res.render("listings", { templateVars });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
