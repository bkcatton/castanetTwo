// const express = require("express");
// const router = express.Router();

// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     db.query(
//       `SELECT * FROM listings
//         JOIN users ON listings.seller_id = users.id
//         WHERE seller_id = $1;`, [req.session.user_id]
//     ) //change query to show favorites
//       .then((data) => {
//         const favorites = data.rows;
//         res.json({ favorites });
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err.message });
//       });
//   });
//   return router;
// };
