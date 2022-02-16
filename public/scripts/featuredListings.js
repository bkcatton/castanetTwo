//
// Client facing scripts here
$(document).ready(function () {
  // Renders the featured listings to the page

  loadListings();

  // sets an event to add a listing to a users favorites

  $(document).on("click", ".fave", addFavorite);
});

///-----------------------------------
// loops the data base and builds an html structure to be loaded to the browser

const $addListing = function (listing) {
  // console.log(listing.isactive);
  $(".img-pic").on("click", (e) => {
    // console.log("this is in the onclick", e.target.id);
    localStorage.setItem("singleListingId", e.target.id);
  });
  // console.log(listing);
  const $listingContainer = `<article class= "listing-container">
  <a name="imagelink" class="" href="/single_listing"><img class="img-pic" src='${
    listing.photo_url
  }' id='${listing.id}'/></a>
  ${
    listing.isactive === "false"
      ? `<img class="img-pic" src='https://github.com/bkcatton/castanetTwo/blob/master/public/images/Sold.png?raw=true'/>`
      : `<h3>Active</h3>`
  }
<h3 class="desc">${listing.title}</h3>
<h3 class="city">${listing.city}</h3>
<h3 class="price">$${listing.price}</h3>
<button class="fave" id="${listing.id}"> Favorite </button>

</article>`;

  return $listingContainer;
};

// appends the result of add listing to the ejs

const renderListing = function (listings) {
  console.log(listings);
  const array = listings.listings;
  for (let listing of array) {
    const $item = $addListing(listing);
    $(".top-row").append($item);
  }
};

// loads the ejs to the dom

const loadListings = function () {
  $.get("/api/featuredListings").then((data) => {
    renderListing(data);
  });

  // $.ajax({
  //   url: "http://localhost:8080/api/featuredListings",
  //   method: "GET",
  //   dataType: "json",
  //   success: (data) => {
  //     renderListing(data);
  //     // console.log(listings);
  //   },
  //   error: (error) => {
  //     console.log("this request failed and this was the error", error);
  //   },
  // });
};

// adds a listing to the users favorites page

const addFavorite = function (event) {
  const id = this.id;
  this.style.backgroundColor = "rgb(243, 243, 138)";
  this.style.color = "black";
  this.innerHTML = "Added to favorites";

  $.post(`/api/featuredListings/${id}`).then((data) => {
    console.log("faveclick", data);
  });

  // $.ajax({
  //   url: `/api/featuredListings/${id}`,
  //   method: "POST",
  //   success: (data) => {
  //     console.log("faveclick", data);
  //   },
  //   error: (error) => {
  //     console.log("this request failed and this was the error", error);
  //   },
  // });
};
