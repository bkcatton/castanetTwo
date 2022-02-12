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
const addProperty = function (listings) {
  if (Object.values(listings).includes("")) {
    return;
  }
  return pool
    .query(
      `INSERT INTO listings (title,street_name_number,city,postal_code,sq_ft,seller_id,isActive,property_type,bedroom_number,bathroom_number,parking_spaces,photo_url,price,description)
  VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *;`,
      [
        listings.title,
        listings.street_name_number,
        listings.city,
        listings.postal_code,
        listings.sq_ft,
        listings.seller_id,
        listings.isActive,
        listings.property_type,
        listings.bedroom_number,
        listings.bathroom_number,
        listings.parking_spaces,
        listings.photo_url,
        listings.price,
        listings.description,
      ]
    )
    .then((result) => console.log(result.rows))
    .catch((err) => console.log("error", err.message));
};
