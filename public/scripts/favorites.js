// Client facing scripts here
$(document).ready(function () {
  loadFavorites();

  $(document).on("click", ".unfave", unFavorite);
});

const unFavorite = function (event) {
  const id = this.id;

  console.log("button clicked unfave", id);

  $.ajax({
    url: `/api/favorites/${id}`,
    method: "DELETE",
    success: (data) => {
      console.log("unfaveclick", data);

      loadFavorites();
    },
    error: (error) => {
      console.log("this request failed and this was the error", error);
    },
  });
};

const loadFavorites = function () {
  $.get("/api/favorites").then((data) => {
    renderFavorites(data);
  });
};

const $createFavorite = function (listing) {
  localStorage.clear();
  // console.log("listing", listing);

  $(".img-pic").on("click", (e) => {
    // console.log("this is in the onclick", e.target.id);
    localStorage.setItem("singleListingId", e.target.id);
  });
  // console.log("listing id in favs", listing.listing_id);
  // console.log(listing);
  const $listingContainer = `<article class="listing-container">
  <a name="imagelink" class="" href="/single_listing"><img class="img-pic" src='${
    listing.photo_url
  }' id='${listing.listing_id}'/></a>
  ${
    listing.isactive === "false"
      ? `<img class="img-pic" src='https://github.com/bkcatton/castanetTwo/blob/master/public/images/Sold.png?raw=true'/>`
      : `<h3>Active</h3>`
  }
<h3 class="desc">${listing.title}</h3>
<h3 class="city">${listing.city}</h3>
<h3 class="price">$${listing.price}</h3>

<button class="unfave" id="${listing.fid}">unfave</button>

</article>`;

  return $listingContainer;
};
const renderFavorites = function (listings) {
  const array = listings.favorites;
  const $container = $(".top-row");
  $container.empty();
  for (let listing of array) {
    const $item = $createFavorite(listing);
    $container.append($item);
  }
};
