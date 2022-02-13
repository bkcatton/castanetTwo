//database query to api/favourites
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("body", +req.query.price);
    if (req.query.price === null) {
      console.log("its null");
    }

    db.query(
      `SELECT * FROM listings
    WHERE city LIKE $1
    AND price < $2;`,
      [`%${req.query.cityName.slice(1)}%`, +req.query.price]
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
