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
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    db.query(`DELETE FROM listings WHERE listings.id = $1 RETURNING *`, [id])
      .then((data) => {
        // res.redirect("/myListings");
        const deleted = data.rows.length;
        res.json({id, deleted});
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/:id", (req, res) => {
    // const soldItem = localStorage.getItem('solditem');
    // console.log(soldItem);
    db.query(`UPDATE listings SET isActive = 'false' WHERE listings.id = $1 RETURNING *`, [req.params.id])
      .then((data) => {
        // res.redirect("/myListings");
        res.json(data.rows[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
