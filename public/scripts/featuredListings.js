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
  $(".top-row").on("click", (e) => {
    localStorage.setItem("singleListingId", e.target.id);
  });
  // console.log(listing);
  const $listingContainer = `<article class= "listing-container">
  <div class="index-div">
  <a name="imagelink" class="pic-anchor" href="/single_listing"><img class="img-pic" src='${
    listing.photo_url
  }' id='${listing.id}'/></a>
  <div class="info-div">
   <h3 class="price">Listing Price : $${listing.price}</h3>
   <h3 class="city">City : ${listing.city}</h3>

  ${
    listing.isactive === "false"
      ? `<img class="sold-pic" src='https://github.com/bkcatton/castanetTwo/blob/master/public/images/Sold.png?raw=true'/>`
      : `<h3 class="active">Active Listing</h3>`
  }

  </div>
  </div>
<h3 class="desc">${listing.title}</h3>
<button class="fave" id="${listing.id}"> Favorite </button>

</article>`;

  return $listingContainer;
};

// appends the result of add listing to the ejs

const renderListing = function (listings) {
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
};

// adds a listing to the users favorites page

const addFavorite = function (event) {
  const id = this.id;
  this.style.backgroundColor = "rgb(49, 207, 44)";
  this.style.color = "black";
  this.innerHTML = "Added";

  $.post(`/api/featuredListings/${id}`).then((data) => {});
};
