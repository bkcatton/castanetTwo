// Client facing scripts here
$(document).ready(function () {
  const $topRow = $(".top-row");
  const $link = $(".single-listing");

  // $topRow.on("click", (e) => {
  //   e.preventDefault();
  //   console.log(e.target.id);
  // });
  const $addListing = function (listing) {

    const $listingContainer = `<article>
    <a name="imagelink" class="single-listing" href="/single_listing"><img src='${listing.photo_url}' id='${listing.id}'/></a>
  <h3>${listing.title}</h3>
  <h3>${listing.city}</h3>
  <h3>Asking Price: $${listing.price}</h3>
  <h3>${listing.street_name_number}</h3>
  <h3>${listing.postal_code}</h3>
  <h3>Square Footage: ${listing.sq_ft} square feet</h3>
  <h3>Property Type: ${listing.property_type}</h3>
  <h3>Number of Bedrooms: ${listing.bedroom_number}</h3>
  <h3>Number of Bathrooms: ${listing.bathroom_number}</h3>
  <h3>Number of Parking Spaces:${listing.parking_spaces}</h3>
  </article>`;

    return $listingContainer;
  };
  const renderListing = function (listings) {
    for (let listing of listings) {
      const $item = $addListing(listing);
      $(".top-row").append($item);
    }
  };
  const loadListings = function () {
   $.ajax({
        url: "http://localhost:8080/api/singleListing",
        method: "GET",
        dataType: "json",
        data: {id: localStorage.getItem('singleListingId')},
        success: (data) => {
          console.log("from our new data obj", data);
          renderListing(data.listing);
        },
        error: (error) => {
          console.log("this request failed and this was the error", error);
        },
      });
    }
  loadListings();

});

