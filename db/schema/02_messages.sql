DROP TABLE IF EXISTS messages CASCADE;
DROP SEQUENCE IF EXISTS messages_sequence CASCADE;
CREATE SEQUENCE messages_sequence
  start 14
  increment 1;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  message_body TEXT
);
