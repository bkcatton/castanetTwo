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
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id) DELETE ON CASCADE,
  receiver_id INTEGER REFERENCES users(id) DELETE ON CASCADE,
  message_body TEXT
);
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) DELETE ON CASCADE,
  listings_id INTEGER REFERENCES listings(id) DELETE ON CASCADE,
  message_body TEXT
);
CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT,
  street_name_number TEXT,
  city TEXT,
  postal_code TEXT,
  sq_ft SMALLINT,
  seller_id INTEGER REFERENCES users(id) DELETE ON CASCADE,
  isActive BOOLEAN,
  property_type VARCHAR(255) NOT NULL,
  bedroom_number TINYINT,
  bathroom_number TINYINT,
  parking_spaces TINYINT,
  photo_url TEXT,
  price SMALLINT
)


