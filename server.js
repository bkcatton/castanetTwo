// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
// const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["user_id"],
  })
);

// app.use(
//   "/styles",
//   sassMiddleware({
//     source: __dirname + "/styles",
//     destination: __dirname + "/public/styles",
//     isSass: false, // false => scss, true => sass
//   })
// );

app.use(express.static(__dirname + "/public"));
app.use(express.static("public"));

//DATABASE QUERIES
const usersRoutes = require("./routes/login");
// const newListing = require("./routes/new");
const newRoutes = require("./routes/new");
// const Routes = require("./routes/usersQ");
//favourites query ->rendered on index
const favorites = require("./routes/favoritesQ");
//mylistings query -> rendered on index
const myListings = require("./routes/myListingsQ");

//search query -> rendered on index
const listingSearch = require("./routes/listingSearchQ");
//featured query -> rendered on index -> main view
const featuredListings = require("./routes/featuredListingsQ");

//single listing query -> render on single_listing
const singleListing = require("./routes/singleListingQ");

//send text query
const sendTextQuery = require("./routes/sendTextQ");
//receive text query
const receiveTextQuery = require("./routes/receiveTextQ");
//all messages query -> render on myMessages
const myMessages = require("./routes/myMessagesQ");
//all messages query -> render on myMessages
const oneConversation = require("./routes/oneConversationQ");

// login routes
const loginRoutes = require("./routes/login");
//logout
const logoutRoutes = require("./routes/logout");

//new POST query -> post to database from new

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
//API ROUTES
app.use("/api/users", usersRoutes(db)); //make new
app.use("/api/favorites", favorites(db));
app.use("/api/myListings", myListings(db));
app.use("/api/featuredListings", featuredListings(db));
app.use("/api/listingSearch", listingSearch(db));
app.use("/api/singleListing", singleListing(db));
app.use("/api/sendText", sendTextQuery(db));
app.use("/api/receiveText", receiveTextQuery(db));
app.use("/api/myMessages", myMessages(db)); //gets all distinct conversations
app.use("/api/oneConversation", oneConversation(db)); //gets all messages from one conversation
app.use("/new", newRoutes(db));
app.use("/", loginRoutes(db));
app.use("/", logoutRoutes(db));

//PAGE ROUTES
app.get("/", (req, res) => {
  const user = req.session.user_id;
  const templateVars = {
    user,
  };

  res.render("index", templateVars);
});

app.get("/single_listing", (req, res) => {
  const user = req.session.user_id;
  const templateVars = {
    user,
  };

  res.render("single_listing", templateVars);
});

app.get("/new", (req, res) => {
  const user = req.session.user_id;
  const templateVars = {
    user
  };
  res.render("new", templateVars);
});

app.get("/favorites", (req, res) => {
  const user = req.session.user_id;

  const templateVars = {
    user,
  };

  res.render("favorites", templateVars);
});

app.get("/myListings", (req, res) => {
  const user = req.session.user_id;
  const templateVars = {
    user,
  };
  res.render("myListings", templateVars);
});
//this will direct to a page that shows all of the logged in users messages
app.get("/myMessages", (req, res) => {
  const user = req.session.user_id;

  const templateVars = {
    user,
  };
  res.render("myMessages", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
