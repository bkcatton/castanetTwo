//database query to api/favourites
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("body", +req.query.price);

    db.query(
      `SELECT * FROM listings
    WHERE city = $1
    AND price < $2;`,
      [req.query.cityName, +req.query.price]
    )
      .then((data) => {
        console.log("in then", data.rows);
        const city = data.rows;
        console.log("CITY", city);
        res.json({ city });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
