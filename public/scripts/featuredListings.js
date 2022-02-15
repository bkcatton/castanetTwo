//
// Client facing scripts here
$(document).ready(function () {
  // // const $change = $('#target');

  const $topRow = $(".top-row");
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
  <button class="fave" id="${listing.id}">fave</button>

  </article>`;

    return $listingContainer;
  };
  const renderListing = function (listings) {
    console.log(listings);
    const array = listings.listings;
    for (let listing of array) {
      const $item = $addListing(listing);
      $(".top-row").append($item);
    }
  };
  const loadListings = function () {
    $.ajax({
      url: "http://localhost:8080/api/featuredListings",
      method: "GET",
      dataType: "json",
      success: (data) => {
        renderListing(data);
        // console.log(listings);
      },
      error: (error) => {
        console.log("this request failed and this was the error", error);
      },
    });
  };
  loadListings();

  //to unfave a listing

  $(document).on("click", ".fave", addFavorite);
});
const addFavorite = function (event) {
  const id = this.id;

  $.ajax({
    url: `/api/featuredListings/${id}`,
    method: "POST",
    success: (data) => {
      console.log("faveclick", data);
    },
    error: (error) => {
      console.log("this request failed and this was the error", error);
    },
  });
};
