//
// Client facing scripts here
$(document).ready(function () {
  // // const $change = $('#target');
  const $topRow = $(".top-row");
  const $addListing = function (listing) {
    $(".top-row").on("click", (e) => {
      console.log("this is in the onclick", e.target.id);
      localStorage.setItem('singleListingId', e.target.id);

    });
    // console.log(listing);
    const $listingContainer = `<article>
    <a name="imagelink" class="single-listing" href="/single_listing"><img src='${listing.photo_url}' id='${listing.id}'/></a>
  <h3>${listing.title}</h3>
  <h3>${listing.city}</h3>
  <h3>$${listing.price}</h3>
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
});
