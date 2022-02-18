//database query to api/favorites
const express = require("express");
const router = express.Router();
const sql = require("../lib/sql")

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(sql.getAllFavourites,[req.session.user_id]) //change query to show favorites
      .then((data) => {
        const favorites = data.rows;
        res.json({ favorites });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:id", (req, res) => {
    const id = req.params.id;
    console.log("the data coming through", id);

    db.query(`DELETE FROM favorites WHERE id = $1 RETURNING *`, [id])
      .then((data) => {
        // localStorage.clear();
        console.log("deleted from faves?");
        // location.reload(true);
        const deleted = data.rows.length;
        res.json({ id, deleted });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
