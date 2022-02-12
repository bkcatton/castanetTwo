DROP TABLE IF EXISTS listings CASCADE;

CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT,
  street_name_number TEXT,
  city TEXT,
  postal_code TEXT,
  sq_ft SMALLINT,
  seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  isActive BOOLEAN,
  property_type VARCHAR(255) NOT NULL,
  bedroom_number SMALLINT,
  bathroom_number SMALLINT,
  parking_spaces SMALLINT,
  photo_url TEXT,
  price INTEGER
);
