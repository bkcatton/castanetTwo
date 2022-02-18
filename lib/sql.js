const getAllFavourites = `SELECT * , favorites.id as fid
FROM listings
JOIN favorites ON listings.id = listing_id
  WHERE user_id = $1`;

module.exports = {getAllFavourites};
