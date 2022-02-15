// Client facing scripts here
$(document).ready(function () {
  const $topRow = $(".top-row");

  const $addListing = function (listing) {
    localStorage.clear();

    $(".top-row").on("click", (e) => {
      console.log("this is in the onclick", e.target.id);
      localStorage.setItem("singleListingId", e.target.id);
    });
    console.log("listing id in favs", listing.listing_id);
    console.log(listing);
    const $listingContainer = `<article class="listing-container">
    <a name="imagelink" class="" href="/single_listing"><img class="img-pic" src='${listing.photo_url}' id='${listing.listing_id}'/></a>
  <h3 class="desc">${listing.title}</h3>
  <h3 class="city">${listing.city}</h3>
  <h3 class="price">$${listing.price}</h3>
  <button>unfave</button>
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
