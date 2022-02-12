const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM listings;`)
      .then((data) => {
        // console.log(data);
        const templateVars = data.rows;
        res.render("listings", { templateVars });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/", (req, res) => {
    console.log(req.body.city);

    db.query(
      `SELECT * FROM listings
    WHERE city = $1
    AND price < $2;`,
      [req.body.city, req.body.price]
    )
      .then((data) => {
        // console.log(data);
        const templateVars = data.rows;
        res.render("listings", { templateVars });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    return;
  });
  return router;
};
