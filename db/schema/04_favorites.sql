DROP TABLE IF EXISTS favorites CASCADE;
DROP SEQUENCE IF EXISTS favorites_sequence CASCADE;
CREATE SEQUENCE favorites_sequence
  start 14
  increment 2;

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE
);
