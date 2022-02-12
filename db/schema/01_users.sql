-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS listings CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(30),
  is_admin BOOLEAN
);


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


CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE
);
