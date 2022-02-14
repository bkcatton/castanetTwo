// Client facing scripts here
$(document).ready(function () {
  const $topRow = $(".top-row");
  const $addListing = function (listing) {
    console.log(listing);
    const $listingContainer = `<article class="single-listing">
    <a name="imagelink" id='${listing.id}' class="single-listing" href="/single_listing"> <img src='${listing.photo_url}' /></a>
  <h3>${listing.title}</h3>
  <h3>${listing.city}</h3>
  <h3>$${listing.price}</h3>
  </article>`;

    return $listingContainer;
  };
  const renderListing = function (listings) {
    const array = listings.favorites;
    for (let listing of array) {
      const $item = $addListing(listing);
      $(".top-row").append($item);
    }
  };
  const loadListings = function () {
    $.ajax({
      url: "http://localhost:8080/api/favorites",
      method: "GET",
      dataType: "json",
      // data: {  }
      success: (data) => {
        console.log("data", data);
        renderListing(data);
        // console.log(listings);
      },
      error: (error) => {
        console.log("this request failed and this was the error", error);
      },
    });
  };
  loadListings();
});
