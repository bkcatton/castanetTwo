/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post('/new', (req, res) => {
    db.query(`INSERT INTO listings (id, title, street_name_number, city, postal_code, sq_ft, seller_id, isActive,
      property_type,
      bedroom_number,
      bathroom_number,
      parking_spaces,
      photo_url,
      price
    )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;`,
    [ 15, req.body.title, req.body.address, req.body.city, req.body.postcode, req.body.sqft, 1, true, req.body.type, req.body.bedrooms, req.body.bathrooms, req.body.parking, req.body.photo_url, req.body.price])
      .then(data => {
        const templateVars = data.rows;
        res.render('listings', { templateVars });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
